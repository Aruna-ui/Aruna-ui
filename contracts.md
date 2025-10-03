# API Contracts & Backend Integration Plan

## Gothic Author Website - Backend Implementation

### 1. Visitor Tracking System

#### Database Models

**VisitorStats Model:**
```python
class VisitorStats(BaseModel):
    id: str
    total_visits: int
    unique_visitors: int
    daily_visits: int
    weekly_visits: int
    monthly_visits: int
    last_reset_date: datetime
    created_at: datetime
    updated_at: datetime
```

**PageViews Model:**
```python
class PageView(BaseModel):
    id: str
    page_path: str
    visitor_ip: str (hashed for privacy)
    timestamp: datetime
    user_agent: str (optional)
    referrer: str (optional)
```

#### API Endpoints

**GET /api/visitor-stats**
- Response: Current visitor statistics
- Public endpoint for frontend display

**POST /api/track-visit**
- Body: { page_path: str, timestamp: datetime }
- Response: { success: bool }
- Increments visitor counts

**GET /api/page-stats/{page}**
- Response: Statistics for specific page/section
- Used for book popularity tracking

### 2. Contact Form System

#### Database Models

**ContactMessage Model:**
```python
class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: str (new/read/replied)
    ip_address: str (hashed)
    created_at: datetime
```

#### API Endpoints

**POST /api/contact**
- Body: ContactMessage data
- Response: { success: bool, message: str }
- Stores message and sends notification

**GET /api/contact-messages** (Admin only)
- Response: List of contact messages
- For future admin dashboard

### 3. Frontend Integration Points

#### Mock Data Replacement:
- Remove mock visitor counts from frontend
- Replace with real API calls
- Add loading states for counters

#### Contact Form:
- Replace mock form submission
- Add proper error handling
- Success/failure feedback messages

#### Display Components:
- Visitor counter in footer
- Popular books section based on views
- Real-time stats updates

### 4. Privacy & Security

#### Data Protection:
- Hash IP addresses for uniqueness without storing personal data
- No cookies or personal tracking
- Anonymous analytics only

#### Rate Limiting:
- Prevent spam on contact form
- Limit visitor tracking calls

### 5. Implementation Order

1. **Backend Models & Database Setup**
2. **Visitor Tracking API Endpoints**  
3. **Contact Form API Endpoint**
4. **Frontend API Integration**
5. **Error Handling & Loading States**
6. **Testing & Validation**

### 6. Gothic Theme Integration

#### Counter Display Styling:
- Dark theme with teal accent counters
- Gothic fonts for numbers
- Atmospheric hover effects
- Positioned in footer as "Souls Who Have Wandered Here"

#### Success Messages:
- "Your message has been cast into the void..."
- "The shadows have received your words..."
- Gothic-themed user feedback