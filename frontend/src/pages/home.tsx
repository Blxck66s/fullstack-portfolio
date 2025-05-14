import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import TimelineTabs from "@/components/TimelineTabs";

function Home() {
  return (
    <div className="flex min-h-screen max-w-3xl min-w-xs flex-col items-center gap-4 p-5">
      <Hero />
      <TimelineTabs />
      <TechStack />
    </div>
  );
}

export default Home;
