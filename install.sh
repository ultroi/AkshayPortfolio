#!/bin/bash
# Portfolio Installation Script

echo "🚀 Akshay Singh's Portfolio Installation"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Start development server: npm start"
    echo "   2. Build for production: npm run build"
    echo "   3. Update your information in src/components/"
    echo ""
    echo "📚 See SETUP_GUIDE.md for detailed instructions"
else
    echo "❌ Installation failed. Please try again."
    exit 1
fi
