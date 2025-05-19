import HeroSkeleton from "@/components/HeroSkeleton";

import { Suspense, lazy } from "react";
const Hero = lazy(() => import("@/components/Hero"));
const TimelineTabs = lazy(() => import("@/components/TimelineTabs"));
const TechStack = lazy(() => import("@/components/TechStack"));
const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase"));

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 p-5 pt-10 lg:flex-row lg:items-start lg:justify-center lg:gap-10">
      <div className="flex w-full flex-col gap-4 lg:max-w-2xl">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
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
