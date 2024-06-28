
'use client';
import DailyScheduler from "./ui/DailyScheduler";
import { init } from "./lib/utils";

export default function Home() {
  init("2024-01-01", 0);
  return (
    <div className="App">
      <DailyScheduler />
    </div>
  );
}
