from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


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
class MailingListSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    source: str = "website"

class MailingListSignupCreate(BaseModel):
    email: EmailStr

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Aruna's Author Website API"}

# Mailing List Routes
@api_router.post("/mailing-list/signup")
async def signup_mailing_list(signup: MailingListSignupCreate):
    try:
        # Check if email already exists
        existing = await db.mailing_list.find_one({"email": signup.email})
        if existing:
            raise HTTPException(status_code=409, detail="Email already subscribed")
        
        # Create new signup
        signup_obj = MailingListSignup(**signup.dict())
        await db.mailing_list.insert_one(signup_obj.dict())
        
        return {
            "success": True,
            "message": "Successfully subscribed to mailing list",
            "data": {
                "id": signup_obj.id,
                "email": signup_obj.email,
                "subscribed_at": signup_obj.subscribed_at
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error in mailing list signup: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process signup")

@api_router.get("/mailing-list")
async def get_mailing_list():
    try:
        signups = await db.mailing_list.find().to_list(1000)
        return {
            "success": True,
            "count": len(signups),
            "data": [MailingListSignup(**signup) for signup in signups]
        }
    except Exception as e:
        logging.error(f"Error fetching mailing list: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch mailing list")

# Contact Form Routes
@api_router.post("/contact/submit")
async def submit_contact_form(contact: ContactMessageCreate):
    try:
        # Create new contact message
        contact_obj = ContactMessage(**contact.dict())
        await db.contact_messages.insert_one(contact_obj.dict())
        
        return {
            "success": True,
            "message": "Message sent successfully",
            "data": {
                "id": contact_obj.id,
                "submitted_at": contact_obj.submitted_at
            }
        }
    except Exception as e:
        logging.error(f"Error in contact form submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message")

@api_router.get("/contact/messages")
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().to_list(1000)
        return {
            "success": True,
            "count": len(messages),
            "data": [ContactMessage(**msg) for msg in messages]
        }
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

# Visitor Counter Routes
@api_router.post("/visitors/track")
async def track_visitor():
    try:
        # Check if visitor counter exists
        counter = await db.visitor_counter.find_one({"_id": "main_counter"})
        
        if counter:
            # Increment counter
            await db.visitor_counter.update_one(
                {"_id": "main_counter"},
                {"$inc": {"count": 1}, "$set": {"last_visit": datetime.utcnow()}}
            )
            new_count = counter["count"] + 1
        else:
            # Create new counter
            await db.visitor_counter.insert_one({
                "_id": "main_counter",
                "count": 1,
                "last_visit": datetime.utcnow()
            })
            new_count = 1
        
        return {
            "success": True,
            "count": new_count
        }
    except Exception as e:
        logging.error(f"Error tracking visitor: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to track visitor")

@api_router.get("/visitors/count")
async def get_visitor_count():
    try:
        counter = await db.visitor_counter.find_one({"_id": "main_counter"})
        
        if counter:
            return {
                "success": True,
                "count": counter["count"]
            }
        else:
            return {
                "success": True,
                "count": 0
            }
    except Exception as e:
        logging.error(f"Error fetching visitor count: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch visitor count")

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