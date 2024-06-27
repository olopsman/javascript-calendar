
'use client';
import DailyScheduler from "./ui/DailyScheduler";

export default function Home() {
  const updateAss = () => {
    console.log("update")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Scheduler</div>
      <DailyScheduler />
    </main>
  );
}
