import Hero from "@/components/Hero";
import Links from "@/components/Links";
import { ModeToggle } from "@/components/mode-toggle";
import Timeline from "@/components/Timeline";

function Home() {
  return (
    <div className="flex min-h-screen max-w-3xl min-w-xs flex-col items-center gap-4 p-5">
      <Hero />
      <Links />
      <div className="flex gap-2">
        <ModeToggle />
      </div>
      <Timeline />
    </div>
  );
}

export default Home;
