import { Card } from "@/components/ui/card";
import { Users, Clock } from "lucide-react";

interface SessionStatsProps {
  studentCount: number;
  sessionTime: string;
}

export default function SessionStats({ studentCount, sessionTime }: SessionStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold font-mono" data-testid="text-student-count">{studentCount}</p>
            <p className="text-sm text-muted-foreground">Students</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold font-mono" data-testid="text-session-time">{sessionTime}</p>
            <p className="text-sm text-muted-foreground">Session Time</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
