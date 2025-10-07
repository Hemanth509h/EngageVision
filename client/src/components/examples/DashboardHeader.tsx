import { useState } from "react";
import DashboardHeader from "../DashboardHeader";

export default function DashboardHeaderExample() {
  const [active, setActive] = useState(false);

  return (
    <DashboardHeader
      isSessionActive={active}
      onToggleSession={() => setActive(!active)}
    />
  );
}
