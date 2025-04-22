/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import { motion } from "motion/react";
import React from "react";

interface ShinyGreenTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}

const ShinyGreenText: React.FC<ShinyGreenTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`inline-block bg-clip-text text-[#b5b5b5a4] ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      <motion.span
        animate={{
          color: ["#72cfa0", "#b5b5b5a4"],
          textShadow: ["0 0 2px #72cfa0", "0 0 0px #b5b5b5a4"],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default ShinyGreenText;
