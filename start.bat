@echo off
REM Student Engagement Monitor - Windows Startup Script

echo Starting Student Engagement Monitor...
echo.

REM Check if Python backend dependencies are installed
if not exist "backend\venv" (
    echo Python virtual environment not found.
    echo Creating virtual environment and installing dependencies...
    echo.
    cd backend
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
    cd ..
)

REM Start Python backend in new window
echo Starting Python backend on port 8000...
start "Python Backend" cmd /k "cd backend && venv\Scripts\activate && python app.py"

REM Wait for backend to start
timeout /t 2 /nobreak >nul

REM Start Node.js frontend in new window
echo Starting React frontend on port 5000...
start "React Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting in separate windows!
echo.
echo Frontend: http://localhost:5000
echo Backend: http://localhost:8000
echo WebSocket: ws://localhost:8000/ws
echo.
echo Close the terminal windows to stop the servers
pause
