import StudentEmotions from "../StudentEmotions";

export default function StudentEmotionsExample() {
  const mockStudents = [
    { id: "1", emotion: "Happy", confidence: 92 },
    { id: "2", emotion: "Neutral", confidence: 78 },
    { id: "3", emotion: "Surprise", confidence: 85 },
    { id: "4", emotion: "Happy", confidence: 88 },
  ];

  return <StudentEmotions students={mockStudents} />;
}
