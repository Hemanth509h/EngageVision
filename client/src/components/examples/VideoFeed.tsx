import VideoFeed from "../VideoFeed";

export default function VideoFeedExample() {
  return (
    <VideoFeed
      engagementLevel="moderate"
      onFrame={(data) => console.log("Frame captured:", data.substring(0, 50))}
    />
  );
}
