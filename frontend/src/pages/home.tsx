import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechStack from "@/components/TechStack";
import TimelineTabs from "@/components/TimelineTabs";

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 p-5 pt-10 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
      <div className="flex w-full flex-col gap-4 lg:max-w-2xl">
        <Hero />
        <TimelineTabs />
      </div>
      <div className="flex w-full flex-col gap-4 lg:max-w-2xl">
        <TechStack />
        <ProjectShowcase />
      </div>
    </div>
  );
}

export default Home;
