import dayjs from "dayjs";
import { Cake, MapPinHouse, Mic } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy } from "react";
import RotatingText from "./animation/TextAnimations/rotating-text";
import Links from "./Links";
import OpenToWork from "./OpenToWork";
import { useTheme } from "./theme-provider";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

const Particles = lazy(() => import("./animation/Backgrounds/particles"));

const Hero = () => {
  const { theme } = useTheme();
  const particleColors =
    theme === "dark" ? ["#FFFFFF", "#FFFFFF"] : ["#000000", "#000000"];

  return (
    <Card className="bg-background relative h-full w-full max-w-2xl min-w-xs">
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2 min-[420px]:flex-row">
        <OpenToWork />
        {/* <ModeToggle /> */}
      </div>
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Particles
            className="h-full w-full"
            particleColors={particleColors}
          />
        </Suspense>
      </div>
      <CardHeader className="z-1 flex flex-col items-center justify-start gap-5 min-[420px]:flex-row">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src="/profile-picture.png"
          alt="Ken's Avatar"
          loading="lazy"
          className="aspect-square h-auto w-[70%] rounded-xl object-cover shadow-lg min-[420px]:w-1/3"
        />
        <div className="flex w-full items-center justify-center">
          <div className="flex w-fit flex-col gap-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-fit text-2xl font-bold min-[420px]:w-full sm:text-4xl"
            >
              Hi, I'm Ken
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.6,
              }}
              className="flex w-full justify-start gap-2 text-sm sm:text-lg"
            >
              <div className="">I'm a</div>
              <RotatingText
                texts={["Back-End", "Front-End", "Full-Stack"]}
                mainClassName="bg-card min-w-20 sm:min-w-26  font-bold text-indigo-800 justify-center rounded"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                rotationInterval={2000}
                loop={false}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 400,
                }}
              />
              <div className="">Developer</div>
            </motion.div>
            <Links />
          </div>
        </div>
      </CardHeader>
      <CardContent className="z-1 mx-2 my-2 mb-5 flex h-5 items-center justify-center gap-2 text-xs font-semibold max-sm:flex-wrap sm:h-10 sm:gap-4 sm:text-base md:gap-8 md:text-lg">
        <div className="flex items-center gap-1">
          <Cake className="h-4 w-auto" />
          {dayjs().diff(dayjs("1998-03-28"), "year")} y/o
        </div>
        <Separator orientation="vertical" className="max-[420px]:hidden" />
        <div className="flex items-center gap-1">
          <Mic className="h-4 w-auto" />
          Thai & English
        </div>
        <Separator orientation="vertical" className="max-[420px]:hidden" />
        <div className="flex items-center gap-1">
          <MapPinHouse className="h-4 w-auto" />
          Bangkok, Thailand
        </div>
      </CardContent>
    </Card>
  );
};

export default Hero;
