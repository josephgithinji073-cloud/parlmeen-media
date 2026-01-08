# Quick Start Guide - Pearlmeen Media

## ⚡ 30-Second Setup

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start server
npm start

# Step 3: Open browser
http://localhost:5000
```

---

## ✨ What's New

### Backend API Endpoints
- `POST /api/contact` - Contact form submissions
- `POST /api/newsletter` - Newsletter subscriptions  
- `GET /api/health` - Server status check

### Professional Features
- 📧 Contact form with validation
- 📰 Newsletter subscription
- 🎨 Professional footer on all pages
- 🔒 Security (CORS, rate limiting, input sanitization)
- 📱 Fully responsive design
- ✅ Form error handling and feedback

---

## 🔧 Configuration

Create/Edit `.env` file:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

## 📝 Test the API

### Using curl:
```bash
# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "subject": "Test",
    "message": "Test message"
  }'

# Test newsletter
curl -X POST http://localhost:5000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "your@email.com"}'

# Health check
curl http://localhost:5000/api/health
```

### Using Postman:
1. Download Postman
2. Create new request
3. Set method to POST
4. Paste endpoint URL
5. Add JSON body
6. Send request

---

## 📂 File Structure

```
pearlmeen-web/
├── server.js           ← Backend server
├── package.json        ← Dependencies
├── .env               ← Environment config
├── js/
│   ├── main.js        ← Main functionality
│   ├── contact.js     ← Form handling ← NEW
│   └── main2.js       ← 3D background
├── css/
│   └── style.css      ← Enhanced styling
├── *.html             ← All pages (7 total)
├── README.md          ← Full documentation
├── API_DOCUMENTATION.md ← API guide
└── ENHANCEMENTS.md    ← Change summary
```

---

## 🚀 Commands

```bash
# Start production server
npm start

# Start development server (auto-reload)
npm run dev

# Test
npm test
```

---

## 🎯 Key Files Changed

- ✅ `contact.html` - Added newsletter form, enhanced footer
- ✅ `index.html` - Added newsletter, professional footer
- ✅ `about.html`, `work.html`, `impact.html`, `media.html`, `radio.html` - Professional footer
- ✅ `js/contact.js` - NEW - Form submission handler
- ✅ `css/style.css` - Enhanced with footer and form styles
- ✅ `package.json` - Added backend dependencies

---

## 🔐 Security

The backend includes:
- ✓ Helmet.js (security headers)
- ✓ CORS protection
- ✓ Rate limiting (100 requests/15 min)
- ✓ Input sanitization
- ✓ Email validation
- ✓ Error handling

---

## 💬 Forms

### Contact Form Features
- Name, email, subject, message
- Real-time validation
- Error messages
- Success confirmation
- Smooth animations

### Newsletter Features
- Email subscription
- Validation
- Confirmation message
- On every page

---

## 🌐 Pages with Updates

All 7 pages now have:
- Professional footer with links
- Newsletter subscription
- Social media connections
- Mobile responsive design

---

## 📊 What's Included

| Feature | Status | Location |
|---------|--------|----------|
| Backend Server | ✅ New | server.js |
| Contact API | ✅ New | POST /api/contact |
| Newsletter API | ✅ New | POST /api/newsletter |
| Form Validation | ✅ New | contact.js |
| Professional Footer | ✅ Updated | All .html files |
| Enhanced Forms | ✅ Updated | contact.html |
| Form Styling | ✅ Enhanced | style.css |
| Documentation | ✅ New | README.md, API_DOCUMENTATION.md |

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| Port already in use | Change PORT in .env |
| CORS error | Check CLIENT_URL in .env |
| Forms not working | Check browser console for errors |

---

## 📖 Learn More

- Full docs: See `README.md`
- API guide: See `API_DOCUMENTATION.md`
- Changes: See `ENHANCEMENTS.md`
- Code: Check `server.js` and `js/contact.js`

---

## 🎉 You're Ready!

Your professional Pearlmeen Media website is now live!

**Start here:**
```bash
npm install && npm start
```

Then visit: `http://localhost:5000`

---

**Need help?** Check the documentation files or email: info@pearlmeenmedia.com
