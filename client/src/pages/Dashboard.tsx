import { useState, useEffect, useCallback, useRef } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import VideoFeed from "@/components/VideoFeed";
import EngagementMetric from "@/components/EngagementMetric";
import SessionStats from "@/components/SessionStats";
import EngagementChart from "@/components/EngagementChart";
import StudentEmotions from "@/components/StudentEmotions";
import AlertToast from "@/components/AlertToast";

export default function Dashboard() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [engagement, setEngagement] = useState(60);
  const [studentCount, setStudentCount] = useState(0);
  const [sessionTime, setSessionTime] = useState("00:00");
  const [showAlert, setShowAlert] = useState(false);
  const [chartData, setChartData] = useState<{ time: string; engagement: number }[]>([]);
  const [students, setStudents] = useState<{ id: string; emotion: string; confidence: number }[]>([]);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const getEngagementLevel = (pct: number): "high" | "moderate" | "low" => {
    if (pct >= 70) return "high";
    if (pct >= 40) return "moderate";
    return "low";
  };

  const handleToggleSession = () => {
    if (!isSessionActive) {
      setSessionStart(Date.now());
      setChartData([]);
    } else {
      setSessionStart(null);
      setSessionTime("00:00");
    }
    setIsSessionActive(!isSessionActive);
  };

  const handleFrame = useCallback((imageData: string) => {
    if (!isSessionActive || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    
    // Send frame to Python backend for analysis
    wsRef.current.send(JSON.stringify({
      type: "frame",
      data: imageData
    }));
  }, [isSessionActive]);

  // WebSocket connection
  useEffect(() => {
    if (!isSessionActive) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    // Connect to Python backend WebSocket
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws";
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log("Connected to Python backend");
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === "analysis") {
        const data = message.data;
        setEngagement(data.avg_engagement);
        setStudentCount(data.student_count);
        setStudents(data.students);

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        setChartData(prev => {
          const updated = [...prev, { time: timeStr, engagement: data.avg_engagement }];
          return updated.slice(-20);
        });

        if (data.avg_engagement < 40 && !showAlert) {
          setShowAlert(true);
        }
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current.onclose = () => {
      console.log("Disconnected from Python backend");
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isSessionActive, showAlert]);

  useEffect(() => {
    if (!isSessionActive || !sessionStart) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      setSessionTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSessionActive, sessionStart]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        isSessionActive={isSessionActive}
        onToggleSession={handleToggleSession}
      />
      
      <main className="container max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <VideoFeed
              engagementLevel={getEngagementLevel(engagement)}
              onFrame={handleFrame}
            />
            
            <SessionStats
              studentCount={studentCount}
              sessionTime={sessionTime}
            />
          </div>

          <div className="space-y-6">
            <EngagementMetric percentage={engagement} />
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <EngagementChart data={chartData} />
          {students.length > 0 && <StudentEmotions students={students} />}
        </div>
      </main>

      <AlertToast
        message="Low Engagement Alert: Class engagement has dropped below 40%. Consider changing your teaching approach."
        show={showAlert}
        onDismiss={() => setShowAlert(false)}
      />
    </div>
  );
}
