import { useState, useEffect, useCallback } from "react";
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
    if (!isSessionActive) return;
    
    console.log("Processing frame:", imageData.substring(0, 50));
    
    // TODO: Remove mock functionality - replace with actual API call
    // This simulates the emotion detection API response
    const mockEngagement = Math.floor(Math.random() * 60) + 30;
    const mockStudentCount = Math.floor(Math.random() * 5) + 1;
    const emotions = ["Happy", "Neutral", "Surprise", "Sad"];
    
    setEngagement(mockEngagement);
    setStudentCount(mockStudentCount);
    
    const mockStudents = Array.from({ length: mockStudentCount }, (_, i) => ({
      id: `student-${i}`,
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      confidence: Math.floor(Math.random() * 30) + 70,
    }));
    setStudents(mockStudents);

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setChartData(prev => {
      const updated = [...prev, { time: timeStr, engagement: mockEngagement }];
      return updated.slice(-20);
    });

    if (mockEngagement < 40 && !showAlert) {
      setShowAlert(true);
    }
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
