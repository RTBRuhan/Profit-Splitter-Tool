@echo off
echo Starting setup...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it first from https://nodejs.org/.
    pause
    exit /b
)

:: Create a new React app if it doesn't exist
if not exist "my-react-app" (
    echo Creating a new React app...
    npx create-react-app my-react-app
)

:: Navigate to the React app folder
cd my-react-app

:: Install Material-UI dependencies with logging
echo Installing Material-UI dependencies...
call npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
if %errorlevel% neq 0 (
    echo Failed to install Material-UI dependencies.
    pause
    exit /b
)

:: Copy provided scripts into the src folder
echo Copying provided scripts into the src folder...
copy "..\src\App.js" "src\App.js"
copy "..\src\InvestmentTool.js" "src\InvestmentTool.js"

:: Return to the parent directory
cd ..

:: Create run.bat file
echo Creating run.bat file...
(
    echo @echo off
    echo cd /d "%%~dp0\my-react-app"
    echo npm start
    echo pause
) > run.bat

echo Setup complete! Use run.bat to start the app.
pause
