import { animate, motion } from "motion/react";
import { useEffect } from "react";

function WaveEmoji() {
  useEffect(() => {
    // Animate the emoji on mount
    const emoji = document.querySelector("p") as HTMLElement;
    if (emoji) {
      animate(
        emoji,
        { scale: [1, 2] },
        {
          duration: 1.5,
          repeat: 1,
          repeatType: "reverse",
        },
      );
    }
  }, []);
  return (
    <>
      <motion.p
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.5,
          transition: { duration: 0.3 },
        }}
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
          repeatDelay: 1.5,
        }}
        className="m-0 p-0"
      >
        👋
      </motion.p>
    </>
  );
}

export default WaveEmoji;
