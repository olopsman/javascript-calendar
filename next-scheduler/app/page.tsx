import CategoryButton from "./ui/CategoryButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Scheduler</div>
      <CategoryButton id={1} name="Category 1" fill="red" stroke="black" />
    </main>
  );
}
