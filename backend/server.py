from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import hashlib
from fastapi import HTTPException, Request


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class VisitorStats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    total_visits: int = 0
    unique_visitors: int = 0
    daily_visits: int = 0
    weekly_visits: int = 0
    monthly_visits: int = 0
    last_reset_date: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PageView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page_path: str
    visitor_ip_hash: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_agent: Optional[str] = None
    referrer: Optional[str] = None

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"
    ip_address_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class TrackVisitRequest(BaseModel):
    page_path: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Helper function to hash IP addresses for privacy
def hash_ip(ip_address: str) -> str:
    return hashlib.sha256(ip_address.encode()).hexdigest()[:16]

# Initialize visitor stats if not exists
async def get_or_create_visitor_stats():
    stats = await db.visitor_stats.find_one()
    if not stats:
        initial_stats = VisitorStats()
        await db.visitor_stats.insert_one(initial_stats.dict())
        return initial_stats
    return VisitorStats(**stats)

@api_router.get("/visitor-stats")
async def get_visitor_stats():
    stats = await get_or_create_visitor_stats()
    return {
        "total_visits": stats.total_visits,
        "unique_visitors": stats.unique_visitors,
        "daily_visits": stats.daily_visits,
        "weekly_visits": stats.weekly_visits,
        "monthly_visits": stats.monthly_visits,
        "last_updated": stats.updated_at
    }

@api_router.post("/track-visit")
async def track_visit(request: TrackVisitRequest, http_request: Request):
    try:
        # Get client IP
        client_ip = http_request.client.host
        if "x-forwarded-for" in http_request.headers:
            client_ip = http_request.headers["x-forwarded-for"].split(",")[0].strip()
        
        ip_hash = hash_ip(client_ip)
        user_agent = http_request.headers.get("user-agent", "")
        referrer = http_request.headers.get("referer", "")
        
        # Record page view
        page_view = PageView(
            page_path=request.page_path,
            visitor_ip_hash=ip_hash,
            user_agent=user_agent,
            referrer=referrer
        )
        await db.page_views.insert_one(page_view.dict())
        
        # Update visitor stats
        stats = await get_or_create_visitor_stats()
        now = datetime.utcnow()
        
        # Check if it's a unique visitor (within last 24 hours)
        recent_visit = await db.page_views.find_one({
            "visitor_ip_hash": ip_hash,
            "timestamp": {"$gte": now - timedelta(hours=24)}
        }, sort=[("timestamp", -1)])
        
        is_unique_today = recent_visit is None or recent_visit["timestamp"] < (now - timedelta(hours=24))
        
        # Reset daily counts if it's a new day
        if stats.last_reset_date.date() < now.date():
            stats.daily_visits = 0
            stats.last_reset_date = now
            
        # Reset weekly counts if it's a new week
        if (now - stats.last_reset_date).days >= 7:
            stats.weekly_visits = 0
            
        # Reset monthly counts if it's a new month
        if stats.last_reset_date.month != now.month or stats.last_reset_date.year != now.year:
            stats.monthly_visits = 0
        
        # Update counters
        stats.total_visits += 1
        stats.daily_visits += 1
        stats.weekly_visits += 1
        stats.monthly_visits += 1
        
        if is_unique_today:
            stats.unique_visitors += 1
            
        stats.updated_at = now
        
        # Update in database
        await db.visitor_stats.replace_one({}, stats.dict())
        
        return {"success": True, "message": "Visit tracked successfully"}
        
    except Exception as e:
        logger.error(f"Error tracking visit: {str(e)}")
        return {"success": False, "message": "Error tracking visit"}

@api_router.get("/page-stats/{page_path}")
async def get_page_stats(page_path: str):
    try:
        # Count total views for this page
        total_views = await db.page_views.count_documents({"page_path": page_path})
        
        # Count unique visitors for this page
        unique_visitors = len(await db.page_views.distinct("visitor_ip_hash", {"page_path": page_path}))
        
        return {
            "page_path": page_path,
            "total_views": total_views,
            "unique_visitors": unique_visitors
        }
        
    except Exception as e:
        logger.error(f"Error getting page stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving page statistics")

@api_router.post("/contact")
async def submit_contact_message(message_data: ContactMessageCreate, http_request: Request):
    try:
        # Get client IP for spam prevention
        client_ip = http_request.client.host
        if "x-forwarded-for" in http_request.headers:
            client_ip = http_request.headers["x-forwarded-for"].split(",")[0].strip()
        
        ip_hash = hash_ip(client_ip)
        
        # Create contact message
        contact_message = ContactMessage(
            name=message_data.name,
            email=message_data.email,
            subject=message_data.subject,
            message=message_data.message,
            ip_address_hash=ip_hash
        )
        
        # Save to database
        await db.contact_messages.insert_one(contact_message.dict())
        
        return {
            "success": True, 
            "message": "Your message has been cast into the void... The shadows will whisper back soon."
        }
        
    except Exception as e:
        logger.error(f"Error submitting contact message: {str(e)}")
        return {
            "success": False, 
            "message": "The ancient spirits are restless. Please try again later."
        }

@api_router.get("/contact-messages")
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error getting contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving messages")

@api_router.post("/feedback")
async def submit_feedback(feedback_data: ContactMessageCreate, http_request: Request):
    try:
        # Get client IP for spam prevention
        client_ip = http_request.client.host
        if "x-forwarded-for" in http_request.headers:
            client_ip = http_request.headers["x-forwarded-for"].split(",")[0].strip()
        
        ip_hash = hash_ip(client_ip)
        
        # Create feedback message (using same structure as contact message)
        feedback_message = ContactMessage(
            name=feedback_data.name,
            email=feedback_data.email or "anonymous@feedback.com",
            subject=feedback_data.subject,
            message=feedback_data.message,
            status="feedback",
            ip_address_hash=ip_hash
        )
        
        # Save to database
        await db.feedback_messages.insert_one(feedback_message.dict())
        
        return {
            "success": True, 
            "message": "Your whispers have reached the shadows... Thank you for sharing your thoughts."
        }
        
    except Exception as e:
        logger.error(f"Error submitting feedback: {str(e)}")
        return {
            "success": False, 
            "message": "The ancient spirits are restless. Please try again later."
        }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
