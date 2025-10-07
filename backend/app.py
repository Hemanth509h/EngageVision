#!/usr/bin/env python3
"""
Student Engagement Monitor - FastAPI Backend
Handles face detection and emotion recognition
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import base64
import random
from datetime import datetime
from typing import List, Dict
import asyncio

app = FastAPI(title="Student Engagement Monitor API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Emotion to engagement mapping
EMOTION_ENGAGEMENT = {
    "happy": 90,
    "surprise": 70,
    "neutral": 60,
    "sad": 30,
    "fear": 25,
    "angry": 20,
    "disgust": 15
}

EMOTIONS = list(EMOTION_ENGAGEMENT.keys())

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

manager = ConnectionManager()


def analyze_frame(image_data: str) -> Dict:
    """
    Analyze a frame for faces and emotions
    
    TODO: Replace this mock implementation with real computer vision:
    1. Decode base64 image
    2. Use OpenCV to detect faces
    3. Use DeepFace to recognize emotions
    4. Calculate engagement score
    
    For now, returns mock data for demonstration
    """
    
    # Mock implementation - replace with real CV/ML
    num_students = random.randint(1, 5)
    students = []
    total_engagement = 0
    
    for i in range(num_students):
        emotion = random.choice(EMOTIONS)
        confidence = random.randint(70, 99)
        engagement = EMOTION_ENGAGEMENT[emotion]
        
        students.append({
            "id": f"student-{i}",
            "emotion": emotion.capitalize(),
            "confidence": confidence,
            "engagement": engagement
        })
        total_engagement += engagement
    
    avg_engagement = total_engagement // num_students if num_students > 0 else 0
    
    return {
        "timestamp": datetime.now().isoformat(),
        "student_count": num_students,
        "avg_engagement": avg_engagement,
        "students": students
    }


@app.get("/")
async def root():
    return {
        "message": "Student Engagement Monitor API",
        "status": "running",
        "endpoints": {
            "websocket": "/ws",
            "health": "/health"
        }
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    print("Client connected to WebSocket")
    
    try:
        while True:
            # Receive frame from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "frame":
                # Analyze the frame
                result = analyze_frame(message.get("data", ""))
                
                # Send results back to client
                await websocket.send_json({
                    "type": "analysis",
                    "data": result
                })
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected from WebSocket")
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
