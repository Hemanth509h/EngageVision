import { Button } from "@/components/ui/button";
import { Activity, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardHeaderProps {
  isSessionActive: boolean;
  onToggleSession: () => void;
}

export default function DashboardHeader({ isSessionActive, onToggleSession }: DashboardHeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold">Student Engagement Monitor</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={isSessionActive ? "destructive" : "default"}
            onClick={onToggleSession}
            data-testid={isSessionActive ? "button-stop-session" : "button-start-session"}
          >
            {isSessionActive ? "Stop Session" : "Start Session"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
