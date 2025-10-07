import EngagementChart from "../EngagementChart";

export default function EngagementChartExample() {
  const mockData = [
    { time: "10:00", engagement: 55 },
    { time: "10:05", engagement: 62 },
    { time: "10:10", engagement: 58 },
    { time: "10:15", engagement: 71 },
    { time: "10:20", engagement: 68 },
    { time: "10:25", engagement: 45 },
    { time: "10:30", engagement: 52 },
  ];

  return <EngagementChart data={mockData} />;
}
