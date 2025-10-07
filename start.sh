#!/bin/bash

# Student Engagement Monitor - Startup Script
# This script runs both the Python backend and Node.js frontend simultaneously

echo "🚀 Starting Student Engagement Monitor..."
echo ""

# Check if Python backend dependencies are installed
if [ ! -d "backend/venv" ]; then
    echo "⚠️  Python virtual environment not found."
    echo "📦 Creating virtual environment and installing dependencies..."
    echo ""
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Python backend
echo "🐍 Starting Python backend on port 8000..."
cd backend
source venv/bin/activate
python3 app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Start Node.js frontend
echo "⚛️  Starting React frontend on port 5000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo ""
echo "📱 Frontend: http://localhost:5000"
echo "🔌 Backend: http://localhost:8000"
echo "🔗 WebSocket: ws://localhost:8000/ws"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait
