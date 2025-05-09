import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ShinyGreenText from "./animation/TextAnimations/shiny-green-text";
import WaveEmoji from "./animation/wave-emoji";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
function OpenToWork() {
  const [showText, setShowText] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 420) setShowText(true);
      else setShowText(false);
    };

    handleResize();
    handleClick();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (window.innerWidth <= 420) {
      setShowText(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowText(false);
      }, 3000);
    }
  };

  return (
    <HoverBorderGradient
      onClick={handleClick}
      className="flex items-center max-[420px]:px-1"
    >
      <WaveEmoji />
      <motion.span
        animate={{
          width: showText ? "auto" : "0px",
          overflow: "hidden",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "inline-block",
        }}
      >
        <ShinyGreenText
          text="Open for work"
          speed={3}
          className="px-1 pb-1 text-xs font-bold whitespace-nowrap"
        />
      </motion.span>
    </HoverBorderGradient>
  );
}

export default OpenToWork;
