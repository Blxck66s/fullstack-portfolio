import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import TimelineTabs from "@/components/TimelineTabs";

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 p-5 pt-10 lg:flex-row lg:flex-wrap lg:items-start lg:justify-center lg:gap-10">
      <div className="flex w-full flex-col gap-4 lg:max-w-2xl">
        <Hero />
        <TimelineTabs />
      </div>
      <TechStack />
    </div>
  );
}

export default Home;
