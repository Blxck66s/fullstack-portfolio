import { motion } from "motion/react";
import StarBorder from "../animation/star-border";

function CustomGreenBadge({ children }: { children?: React.ReactNode }) {
  return (
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
        borderWidth: ["1px", "1px"],
        borderColor: ["#72cfa0", "#3b775b"],
        boxShadow: ["0 0 4px #72cfa0", "0 0 2px #3b775b"],
        transition: { duration: 2, repeat: 0, repeatDelay: 0.5 },
      }}
      className="rounded-[20px]"
    >
      <StarBorder as="button" speed="3s" color="green">
        {children}
      </StarBorder>
    </motion.div>
  );
}

export default CustomGreenBadge;
