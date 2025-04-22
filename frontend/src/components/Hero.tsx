import profilePicture from "@/assets/profile-picture.png";
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";
import StarBorder from "./animation/StarBorder/StarBorder";
import { Card, CardHeader } from "./ui/card";

const Hero = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader className="">
        <div className="flex items-center justify-start gap-5">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={profilePicture}
            alt="Ken's Avatar"
            className="aspect-square h-30 w-30 rounded-xl object-cover shadow-lg"
          />
          <div className="flex flex-col items-start justify-center gap-3">
            <motion.div
              whileTap={{
                scale: 0.95,
                filter: "brightness(0.8)",
                transition: { duration: 0.2, repeat: 0 },
              }}
              whileHover={{
                scale: 1.05,
                filter: "brightness(1.3)",
                transition: { duration: 0.2, repeat: 0 },
              }}
              animate={{
                // backgroundColor: ["#3b775b", "#72cfa0", "#3b775b"],
                // borderColor: ["#72cfa0"],
                transition: { duration: 2, repeat: 0, repeatDelay: 0.5 },
              }}
              className="cursor-pointer rounded-3xl text-[0.8rem]"
            >
              <StarBorder as="button" speed="1s">
                <motion.p
                  style={{
                    display: "inline-block",
                    transformOrigin: "70% 70%",
                  }}
                  animate={{
                    rotate: [0, 20, -10, 20, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="m-0 p-0"
                >
                  👋
                </motion.p>{" "}
                Actively seeking work
              </StarBorder>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold"
            >
              Hi, I'm Ken
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-55 text-base text-gray-400"
            >
              I'm a <br />
              <span className="text-primary font-bold">
                <Typewriter
                  words={[
                    "Back-end Developer",
                    "Front-end Developer",
                    "Full-Stack Developer",
                  ]}
                  loop={2}
                  cursor={true}
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </motion.p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Hero;
