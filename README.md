# Pearlmeen Media - Professional Website

A modern, professional website for Pearlmeen Media featuring African storytelling through documentaries, podcasts, and online radio.

## Features

✓ **Professional Backend** - Express.js server with API endpoints
✓ **Contact Form** - Secure form submission with validation
✓ **Newsletter Signup** - Email subscription management
✓ **Responsive Design** - Mobile-friendly interface
✓ **Modern UI** - Professional styling with smooth animations
✓ **SEO Optimized** - Meta tags and structured content
✓ **Security** - Helmet, CORS, rate limiting, and input sanitization

## Project Structure

```
pearlmeen-web/
├── server.js                    # Express.js backend server
├── package.json                 # Dependencies configuration
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   ├── main.js                # Core JavaScript functionality
│   ├── main2.js               # Three.js 3D background
│   └── contact.js             # Form handling and API calls
├── images/                     # Image assets
├── media/                      # Media files
└── *.html                      # HTML pages
    ├── index.html             # Homepage
    ├── about.html             # About page
    ├── work.html              # Work/Portfolio page
    ├── impact.html            # Impact page
    ├── media.html             # Media page
    ├── radio.html             # Radio page
    └── contact.html           # Contact page
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `helmet` - Security headers
- `express-rate-limit` - API rate limiting
- `mongo-sanitize` - Input sanitization
- `nodemon` - Development server (optional)

### 2. Configure Environment

Create/update `.env` file with:

```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Optional: Add these when ready
# MONGODB_URI=your-mongodb-connection-string
# SENDGRID_API_KEY=your-sendgrid-api-key
```

### 3. Start Development Server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Contact Form
**POST** `/api/contact`

```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "subject": "Subject",
  "message": "Your message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

### Newsletter Subscription
**POST** `/api/newsletter`

```json
{
  "email": "your@email.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!"
}
```

### Health Check
**GET** `/api/health`

## Features Overview

### Frontend
- **HTML5** - Semantic markup with accessibility
- **CSS3** - Modern responsive styling with animations
- **JavaScript** - Form handling and interactivity
- **Three.js** - 3D background effects

### Backend
- **Express.js** - RESTful API server
- **Validation** - Input validation for all forms
- **Error Handling** - Comprehensive error management
- **CORS** - Cross-origin request handling
- **Rate Limiting** - Prevent API abuse
- **Security** - Helmet headers and input sanitization

## Professional Enhancements

✓ **Footer** - Professional footer with links and social media
✓ **Newsletter** - Integrated newsletter subscription
✓ **Forms** - Async form submission with validation
✓ **Styling** - Enhanced colors, spacing, and animations
✓ **Accessibility** - ARIA labels and semantic HTML
✓ **SEO** - Meta tags and Open Graph support

## Customization

### Update Contact Information
Edit contact details in:
- `contact.html` - Phone, email, location
- Footer sections in all `.html` files

### Modify API Endpoints
Edit `server.js` to:
- Add database integration (MongoDB)
- Integrate email service (SendGrid, Nodemailer)
- Add additional routes

### Styling
Edit `css/style.css` to customize:
- Colors (CSS variables at the top)
- Fonts (Google Fonts section)
- Responsive breakpoints

## Next Steps

1. **Database Integration** - Connect MongoDB
2. **Email Service** - Setup SendGrid/Nodemailer
3. **Deployment** - Deploy to Heroku, AWS, or similar
4. **SSL Certificate** - Add HTTPS for production
5. **CDN** - Optimize assets with CDN
6. **Analytics** - Add Google Analytics

## Security Notes

- Never commit `.env` file
- Use environment variables for sensitive data
- Validate all user input on backend
- Keep dependencies updated
- Use HTTPS in production
- Set secure CORS policies

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers

## License

MIT License - © 2025 Pearlmeen Media

## Support

For questions or issues, contact: info@pearlmeenmedia.com

---

**Made with ❤️ for African Storytelling**
