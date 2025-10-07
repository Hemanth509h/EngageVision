import { Card } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DataPoint {
  time: string;
  engagement: number;
}

interface EngagementChartProps {
  data: DataPoint[];
}

export default function EngagementChart({ data }: EngagementChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Engagement Trend</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="time"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            domain={[0, 100]}
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Area
            type="monotone"
            dataKey="engagement"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            fill="url(#engagementGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
