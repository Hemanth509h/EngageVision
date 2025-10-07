# Student Engagement Monitor

A real-time student engagement monitoring system using facial expression analysis with FastAPI backend and React frontend.

## Overview

This application analyzes student engagement through facial expressions and emotion detection using computer vision. It features:
- Real-time webcam video capture with WebRTC
- Multi-student face detection and tracking
- Emotion recognition (7 emotions: Happy, Sad, Angry, Fear, Surprise, Neutral, Disgust)
- Real-time engagement scoring with color-coded indicators
- Live engagement trend charts
- Automatic teacher alerts when engagement drops below 40%
- Session analytics and tracking

## Architecture

### Frontend (React + Vite)
- Port: 5000
- Location: `client/`
- Real-time video capture and WebSocket communication
- Modern dashboard with charts and metrics

### Backend (Python + FastAPI)
- Port: 8000
- Location: `backend/app.py`
- WebSocket endpoint for real-time emotion analysis
- Face detection and emotion recognition

## Running in Replit

Simply click the "Run" button. The Node.js frontend will start automatically on port 5000.

**Note:** The Python backend requires manual installation of dependencies in Replit:
1. Open Shell
2. Run: `cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
3. Run: `python3 backend/app.py` in a separate shell

The frontend will connect to the backend at `ws://localhost:8000/ws`.

## Running Outside Replit

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Webcam access

### Installation

1. **Clone/Download the project**

2. **Install Node.js dependencies:**
```bash
npm install
```

3. **Install Python dependencies:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Running the Application

#### Option 1: Use the Startup Script (Recommended)

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
start.bat
```

This will start both servers automatically.

#### Option 2: Manual Start

**Terminal 1 - Python Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python3 app.py
```

**Terminal 2 - React Frontend:**
```bash
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:5000
- **Backend API:** http://localhost:8000
- **WebSocket:** ws://localhost:8000/ws

## Usage

1. Open http://localhost:5000 in your browser
2. Click "Start Session" in the header
3. Allow camera access when prompted
4. The dashboard will begin tracking engagement automatically

## Adding Real Computer Vision

The current backend uses mock data for demonstration. To add real face detection and emotion recognition:

1. **Install additional dependencies** (already in requirements.txt):
   - opencv-python-headless: Face detection
   - deepface: Emotion recognition
   - tensorflow: Neural network backend

2. **Update `backend/app.py`:**
   - Replace the `analyze_frame()` function with actual CV/ML implementation
   - Use OpenCV's Haar Cascade for face detection
   - Use DeepFace for emotion recognition

3. **Example implementation:**
```python
import cv2
import numpy as np
from deepface import DeepFace

def analyze_frame(image_data: str):
    # Decode base64 image
    img_bytes = base64.b64decode(image_data.split(',')[1])
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Detect faces using OpenCV
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(img, 1.1, 4)
    
    students = []
    for (x, y, w, h) in faces:
        face_img = img[y:y+h, x:x+w]
        # Analyze emotion with DeepFace
        result = DeepFace.analyze(face_img, actions=['emotion'], enforce_detection=False)
        emotion = result[0]['dominant_emotion']
        # Add student data
        students.append({...})
    
    return analysis_result
```

## Environment Variables

Create a `.env` file in the `client/` directory for custom configuration:

```
VITE_WS_URL=ws://localhost:8000/ws
```

## Project Structure

```
.
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Dashboard page
│   │   └── App.tsx          # Main app component
│   └── package.json
├── backend/                   # Python backend
│   ├── app.py               # FastAPI server
│   └── requirements.txt     # Python dependencies
├── start.sh                 # Linux/Mac startup script
├── start.bat               # Windows startup script
└── replit.md              # This file
```

## Privacy & Ethics

- Student consent required before monitoring
- Video is processed locally, not stored or uploaded
- Ensure compliance with FERPA, GDPR, or local regulations
- Use as a supplementary tool, not sole assessment metric

## Troubleshooting

### Camera Not Working
- Grant camera permissions in browser
- Use HTTPS (required except for localhost)
- Ensure no other app is using the camera

### Backend Connection Failed
- Verify Python backend is running on port 8000
- Check firewall settings
- Review browser console for errors (F12)

### Performance Issues
- Reduce number of students in frame
- Close unnecessary browser tabs
- Ensure sufficient CPU/memory available

## Technologies Used

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Recharts
- WebSocket API

**Backend:**
- FastAPI (Python)
- WebSocket
- OpenCV (optional)
- DeepFace (optional)
- TensorFlow (optional)

---

Built for educators to create more engaging learning experiences.
