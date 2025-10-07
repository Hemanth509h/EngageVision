import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface Student {
  id: string;
  emotion: string;
  confidence: number;
}

interface StudentEmotionsProps {
  students: Student[];
}

const emotionColors: Record<string, string> = {
  happy: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  surprise: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  neutral: "bg-muted text-muted-foreground border-border",
  sad: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  fear: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  angry: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  disgust: "bg-chart-4/10 text-chart-4 border-chart-4/20",
};

export default function StudentEmotions({ students }: StudentEmotionsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Individual Students</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex flex-col items-center gap-2 p-3 rounded-lg border bg-card hover-elevate"
            data-testid={`student-card-${student.id}`}
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <Badge variant="outline" className={emotionColors[student.emotion.toLowerCase()] || emotionColors.neutral}>
              {student.emotion}
            </Badge>
            <span className="text-xs text-muted-foreground font-mono">
              {student.confidence}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
