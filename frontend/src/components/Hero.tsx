import profilePicture from "@/assets/profile-picture.png";
import { motion } from "motion/react";
import Particles from "./animation/Backgrounds/particles";
import RotatingText from "./animation/TextAnimations/rotating-text";
import ShinyGreenText from "./animation/TextAnimations/shiny-green-text";
import WaveEmoji from "./animation/wave-emoji";
import { useTheme } from "./theme-provider";
import { Card, CardHeader } from "./ui/card";
import CustomGreenBadge from "./ui/custom-green-badge";

const Hero = () => {
  const { theme } = useTheme();

  const particleColors =
    theme === "dark" ? ["#FFFFFF", "#FFFFFF"] : ["#000000", "#000000"];

  return (
    <Card className="relative h-full w-full">
      <div className="absolute inset-0 z-0">
        <Particles
          className="h-full w-full"
          particleColors={particleColors}
          key={theme}
        />
      </div>
      <CardHeader className="z-1">
        <div className="flex items-center justify-start gap-5">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={profilePicture}
            alt="Ken's Avatar"
            className="aspect-square h-25 w-25 rounded-xl object-cover shadow-lg"
          />
          <div className="flex w-full flex-col items-start justify-center gap-3">
            <CustomGreenBadge>
              <WaveEmoji />{" "}
              <ShinyGreenText
                text="Open for work !"
                speed={3}
                className="text-sm"
              />
            </CustomGreenBadge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold"
            >
              Hi, I'm Ken
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex w-full justify-start gap-2 text-sm text-gray-400"
            >
              <div className="">I'm a</div>
              <RotatingText
                texts={["Back-End", "Front-End", "Full-Stack"]}
                mainClassName="bg-background min-w-20 font-bold text-primary justify-center rounded"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                rotationInterval={2000}
                loop={false}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 400,
                }}
              />
              <div className="">Developer</div>
            </motion.div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Hero;
