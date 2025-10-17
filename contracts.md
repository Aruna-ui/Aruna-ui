# Aruna Author Website - API Contracts

## Overview
This document outlines the API contracts for integrating the frontend with the backend MongoDB database.

## Current Mock Data (mockData.js)
- **Books data** (horror collection + new fiction book)
- **Author bio** (name, tagline, image, paragraphs)
- **Social links** (Instagram, Twitter, Goodreads)
- **Mailing list signups** (empty array)

## Backend Implementation Required

### 1. Mailing List Signups

**Collection**: `mailing_list`

**Model Schema**:
```
{
  id: string (UUID)
  email: string (required, unique)
  subscribed_at: datetime
  source: string (default: "website")
}
```

**API Endpoint**: `POST /api/mailing-list/signup`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed to mailing list",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "subscribed_at": "2025-01-17T12:00:00Z"
  }
}
```

### 2. Contact Form Submissions

**Collection**: `contact_messages`

**Model Schema**:
```
{
  id: string (UUID)
  name: string (required)
  email: string (required)
  message: string (required)
  submitted_at: datetime
  status: string (default: "new")
}
```

**API Endpoint**: `POST /api/contact/submit`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I love your books!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "uuid",
    "submitted_at": "2025-01-17T12:00:00Z"
  }
}
```

## Frontend Integration Changes

### Files to Update:
1. **Contact.jsx** - Replace mock submission with actual API calls
   - Update `handleMailingListSignup` to call `POST /api/mailing-list/signup`
   - Add contact form with `handleContactSubmit` to call `POST /api/contact/submit`

### Remove Mock Data:
- Remove `mockData.js` file after verifying backend returns proper data
- Keep mock data for books and author bio (static content, no backend needed)

## Error Handling
- Frontend should display user-friendly error messages
- Backend should validate email format
- Handle duplicate email submissions gracefully (409 Conflict)
- Return appropriate HTTP status codes (200, 400, 409, 500)

## CORS Configuration
- Backend already configured for CORS with allow_origins=["*"]
- Frontend uses REACT_APP_BACKEND_URL from .env
