import { motion } from "motion/react";

function WaveEmoji() {
  return (
    <>
      <motion.p
        initial={{ scale: 1 }}
        style={{
          display: "inline-block",
          transformOrigin: "70% 70%",
        }}
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.5 }}
        whileInView={{
          rotate: [0, 20, -10, 20, -10, 0],
          scale: [1, 1.5, 1.5, 1.5, 1.5, 1],
          transition: {
            duration: 1.5,
            repeat: 2,
            repeatDelay: 1.5,
          },
        }}
        className="m-0 p-0 text-sm"
      >
        👋
      </motion.p>
    </>
  );
}

export default WaveEmoji;
