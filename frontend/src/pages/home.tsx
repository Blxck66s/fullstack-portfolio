import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import TimelineTabs from "@/components/TimelineTabs";

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 p-5 pt-10">
      <Hero />
      <TimelineTabs />
      <TechStack />
    </div>
  );
}

export default Home;
