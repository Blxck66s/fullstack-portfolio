import profilePicture from "@/assets/profile-picture.png";
import dayjs from "dayjs";
import { Cake, MapPinHouse, Mic } from "lucide-react";
import { motion } from "motion/react";
import Particles from "./animation/Backgrounds/particles";
import RotatingText from "./animation/TextAnimations/rotating-text";
import ShinyGreenText from "./animation/TextAnimations/shiny-green-text";
import WaveEmoji from "./animation/wave-emoji";
import { useTheme } from "./theme-provider";
import { Card, CardContent, CardHeader } from "./ui/card";
import CustomGreenBadge from "./ui/custom-green-badge";
import CustomInfoTag from "./ui/custom-info-tag";

const Hero = () => {
  const { theme } = useTheme();
  const particleColors =
    theme === "dark" ? ["#FFFFFF", "#FFFFFF"] : ["#000000", "#000000"];

  return (
    <Card className="relative h-full w-full">
      <div className="absolute inset-0 z-0">
        <Particles className="h-full w-full" particleColors={particleColors} />
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
                text="Open for work"
                speed={3}
                className="pb-1 text-xs font-bold"
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
              className="flex w-full justify-start gap-2 text-sm"
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
      <CardContent className="z-1 flex w-full items-center justify-center gap-2 text-sm">
        <div className="flex h-fit w-full flex-wrap justify-center gap-2 rounded-xl py-3 backdrop-blur-[1px]">
          <CustomInfoTag className="w-[55%]">
            <Mic className="h-5 w-auto" />
            Thai & English
          </CustomInfoTag>
          <CustomInfoTag className="w-[35%]">
            <MapPinHouse className="h-5 w-auto" />
            Thailand
          </CustomInfoTag>
          <CustomInfoTag className="w-[35%]">
            <Cake className="h-5 w-auto" />
            {dayjs().diff(dayjs("1998-03-28"), "year")} y/o
          </CustomInfoTag>
        </div>
      </CardContent>
    </Card>
  );
};

export default Hero;
