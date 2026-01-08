#!/bin/bash
# Setup script for Pearlmeen Media Website
# Run this script to install dependencies and prepare the project

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Pearlmeen Media - Professional Website Setup            ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✓ npm $(npm --version) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Environment Configuration for Pearlmeen Media

# Server
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Database (when ready to integrate MongoDB)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pearlmeen

# Email Service (SendGrid, Gmail, etc.)
# EMAIL_SERVICE=gmail
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-app-password

# API Keys
# SENDGRID_API_KEY=your-sendgrid-key
EOF
    echo "✓ .env file created"
else
    echo "✓ .env file already exists"
fi

# Create directories if they don't exist
echo ""
echo "📁 Checking project structure..."
mkdir -p css images js media assets

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Setup Complete! 🎉                                      ║"
echo "╚════════════════════════════════════════════════════════════╝"

echo ""
echo "📋 Next steps:"
echo ""
echo "  1. Start the development server:"
echo "     npm run dev"
echo ""
echo "  2. Open your browser:"
echo "     http://localhost:5000"
echo ""
echo "  3. Test the API:"
echo "     curl http://localhost:5000/api/health"
echo ""
echo "  4. Update .env with your configuration"
echo ""
echo "📚 Documentation:"
echo "   - See README.md for full documentation"
echo "   - API endpoints defined in server.js"
echo "   - Frontend code in js/ and css/ directories"
echo ""
echo "💡 Pro Tips:"
echo "   - Use 'npm run dev' for development (auto-reload)"
echo "   - Use 'npm start' for production"
echo "   - Keep .env file secure (it's in .gitignore)"
echo ""

