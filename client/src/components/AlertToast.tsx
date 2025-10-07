import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertToastProps {
  message: string;
  show: boolean;
  onDismiss: () => void;
}

export default function AlertToast({ message, show, onDismiss }: AlertToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!show) {
      setProgress(100);
      return;
    }

    const duration = 8000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev - step;
        if (next <= 0) {
          onDismiss();
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
      <div className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground rounded-lg p-4 shadow-lg max-w-sm" data-testid="alert-toast">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="flex-1 text-sm font-medium">{message}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0 no-default-hover-elevate hover:bg-destructive-foreground/20"
            onClick={onDismiss}
            data-testid="button-dismiss-alert"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-3 h-1 bg-destructive-foreground/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-destructive-foreground transition-all duration-50"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
