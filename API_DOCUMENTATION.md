# Pearlmeen Media API Documentation

## Overview

The Pearlmeen Media backend provides a RESTful API for managing contact forms, newsletter subscriptions, and future integrations with external services.

**Base URL:** `http://localhost:5000`
**API Version:** 1.0

## Security Features

- ✓ CORS protection
- ✓ Rate limiting (100 requests per 15 minutes per IP)
- ✓ Input sanitization (NoSQL injection prevention)
- ✓ Security headers (Helmet.js)
- ✓ Email validation
- ✓ HTTPS ready

## Endpoints

### 1. Contact Form Submission

**Endpoint:** `POST /api/contact`

Submit a contact form message.

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Optional Fields:**
```json
{
  "organization": "string (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

**Error Responses:**

Invalid input (400):
```json
{
  "success": false,
  "message": "All fields are required."
}
```

Invalid email (400):
```json
{
  "success": false,
  "message": "Please provide a valid email address."
}
```

Server error (500):
```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

**Example cURL Request:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Collaboration Inquiry",
    "message": "I would like to discuss a potential partnership."
  }'
```

**Frontend Implementation:**
```javascript
// See js/contact.js for complete implementation
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Inquiry',
    message: 'Your message here'
  })
});

const data = await response.json();
if (data.success) {
  console.log('Message sent successfully!');
}
```

---

### 2. Newsletter Subscription

**Endpoint:** `POST /api/newsletter`

Subscribe an email address to the newsletter.

**Request Body:**
```json
{
  "email": "string (required, valid email)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!"
}
```

**Error Responses:**

Missing email (400):
```json
{
  "success": false,
  "message": "Email is required."
}
```

Invalid email (400):
```json
{
  "success": false,
  "message": "Please provide a valid email address."
}
```

Server error (500):
```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

**Example cURL Request:**
```bash
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

**Frontend Implementation:**
```javascript
const email = document.getElementById('newsletterEmail').value;

const response = await fetch('/api/newsletter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email })
});

const data = await response.json();
if (data.success) {
  console.log('Subscribed successfully!');
}
```

---

### 3. Health Check

**Endpoint:** `GET /api/health`

Check if the server is running and responsive.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-08T10:30:45.123Z"
}
```

**Example cURL Request:**
```bash
curl http://localhost:5000/api/health
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Endpoint not found
- `429` - Too Many Requests (rate limited)
- `500` - Server Error

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Limit:** 100 requests per 15 minutes per IP address
- **Reset:** Automatic after 15 minutes
- **Response:** 429 (Too Many Requests)

---

## Validation Rules

### Email Validation
- Must be in valid email format
- Example: `user@example.com`
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Required Fields
- `name` - Cannot be empty
- `email` - Cannot be empty and must be valid
- `subject` - Cannot be empty
- `message` - Cannot be empty

### Max Field Lengths
- `name` - 100 characters (frontend limited)
- `email` - 255 characters (standard)
- `subject` - 200 characters (frontend limited)
- `message` - 5000 characters (frontend limited)

---

## CORS Configuration

The API accepts requests from:
- `http://localhost:3000` (development)
- Configured via `CLIENT_URL` environment variable

**To allow additional origins:**
1. Update `.env` `CLIENT_URL` variable
2. Modify CORS configuration in `server.js`

---

## Request/Response Examples

### Example 1: Successful Contact Submission
```
POST /api/contact HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@company.com",
  "organization": "ABC NGO",
  "subject": "Documentary Partnership",
  "message": "We would like to discuss collaborating on a documentary project..."
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

### Example 2: Newsletter Double Opt-In
```
POST /api/newsletter HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "news@example.com"
}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Successfully subscribed to our newsletter!"
}
```

---

## Integration Guide

### Step 1: Contact Form
```html
<form id="contactForm">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>

<script src="js/contact.js"></script>
```

### Step 2: Newsletter Form
```html
<form id="newsletterForm">
  <input type="email" name="email" required>
  <button type="submit">Subscribe</button>
</form>
```

Both forms are automatically handled by `js/contact.js`

---

## Future Enhancements

### Planned Features
1. **MongoDB Integration** - Store contacts and subscribers
2. **Email Notifications** - SendGrid integration
3. **Admin Dashboard** - Manage submissions
4. **Analytics** - Track form metrics
5. **File Upload** - Portfolio/media uploads
6. **Authentication** - Admin login system

### To Implement
1. Install required packages
2. Update `.env` with service credentials
3. Modify `server.js` to add new functionality
4. Test with Postman or similar

---

## Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new requests for each endpoint
3. Set method to POST or GET
4. Add request body as JSON
5. Send and verify responses

**Postman Collection Available Upon Request**

---

## Troubleshooting

### Issue: CORS Error
**Solution:** Check `CLIENT_URL` in `.env` matches your frontend URL

### Issue: 429 Too Many Requests
**Solution:** Wait 15 minutes for rate limit to reset

### Issue: Validation Error
**Solution:** Check all required fields are provided and valid

### Issue: Email Service Not Sending
**Solution:** Integrate email service (currently logs only)

---

## Contact & Support

For API questions or issues:
- Email: info@pearlmeenmedia.com
- Documentation: See README.md
- Code: Check server.js for implementation details

---

**Last Updated:** January 2025
**Version:** 1.0.0
