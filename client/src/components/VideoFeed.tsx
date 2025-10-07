import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from "lucide-react";

interface VideoFeedProps {
  engagementLevel: "high" | "moderate" | "low";
  onFrame?: (imageData: string) => void;
}

export default function VideoFeed({ engagementLevel, onFrame }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string>("");

  const borderColors = {
    high: "border-chart-1",
    moderate: "border-chart-2",
    low: "border-chart-4",
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
        setError("");
      }
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsActive(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && onFrame && canvasRef.current && videoRef.current) {
      interval = setInterval(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        if (canvas && video && video.readyState === 4) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL("image/jpeg", 0.8);
            onFrame(imageData);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, onFrame]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <Card className={`p-0 overflow-hidden border-2 transition-colors ${borderColors[engagementLevel]}`}>
      <div className="aspect-video bg-muted relative">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="text-sm text-destructive text-center" data-testid="text-video-error">{error}</p>
          </div>
        ) : !isActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <CameraOff className="w-16 h-16 text-muted-foreground" />
            <Button onClick={startCamera} data-testid="button-start-camera">
              <Camera className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            data-testid="video-feed"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Card>
  );
}
