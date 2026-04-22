@echo off
REM Portfolio Installation Script for Windows

echo 🚀 Akshay Singh's Portfolio Installation
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo ✅ npm found: 
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if errorlevel 1 (
    echo ❌ Installation failed. Please try again.
    pause
    exit /b 1
)

echo.
echo ✅ Installation complete!
echo.
echo 🎯 Next steps:
echo    1. Start development server: npm start
echo    2. Build for production: npm run build
echo    3. Update your information in src/components/
echo.
echo 📚 See SETUP_GUIDE.md for detailed instructions
pause
