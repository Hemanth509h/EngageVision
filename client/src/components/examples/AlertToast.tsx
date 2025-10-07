import { useState } from "react";
import AlertToast from "../AlertToast";
import { Button } from "@/components/ui/button";

export default function AlertToastExample() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setShow(true)}>Show Alert</Button>
      <AlertToast
        message="Low Engagement Alert: Class engagement has dropped below 40%. Consider changing your teaching approach."
        show={show}
        onDismiss={() => setShow(false)}
      />
    </div>
  );
}
