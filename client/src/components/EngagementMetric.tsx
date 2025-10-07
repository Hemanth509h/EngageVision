import { Card } from "@/components/ui/card";

interface EngagementMetricProps {
  percentage: number;
}

export default function EngagementMetric({ percentage }: EngagementMetricProps) {
  const getColor = (pct: number) => {
    if (pct >= 70) return "text-chart-1";
    if (pct >= 40) return "text-chart-2";
    return "text-chart-4";
  };

  const getStrokeColor = (pct: number) => {
    if (pct >= 70) return "stroke-chart-1";
    if (pct >= 40) return "stroke-chart-2";
    return "stroke-chart-4";
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <svg className="w-48 h-48 -rotate-90">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className={`${getStrokeColor(percentage)} transition-all duration-500`}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-6xl font-bold font-mono ${getColor(percentage)}`} data-testid="text-engagement-percentage">
              {percentage}%
            </span>
          </div>
        </div>
        <h3 className="text-lg font-medium mt-6 text-muted-foreground">Class Engagement</h3>
      </div>
    </Card>
  );
}
