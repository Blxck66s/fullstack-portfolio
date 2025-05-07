import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/mode-toggle";
import Timeline from "@/components/Timeline";

function Home() {
  return (
    <div className="bg-background flex h-full min-h-screen w-full min-w-screen flex-col items-center gap-4 p-5">
      <Hero />
      <div className="flex gap-2">
        <ModeToggle />
      </div>
      <Timeline />
    </div>
  );
}

export default Home;
