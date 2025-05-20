import { motion } from "framer-motion";
import { JSX } from "react";

function LinkButtons({
  data,
}: {
  data: { name: string; icon: JSX.Element; href: string }[];
}) {
  const startDelay = 0.8;
  return (
    <>
      {data.map((link, index) => (
        <motion.a
          key={link.name}
          initial={{
            opacity: 0,
            x: index === 0 ? 0 : -20,
            y: index === 0 ? 10 : 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.4, delay: startDelay + index * 0.2 },
          }}
          href={link.href}
          whileTap={{
            scale: 0.8,
            transition: {
              duration: 0.2,
              delay: 0,
              type: "spring",
              stiffness: 400,
              damping: 15,
            },
          }}
          whileHover={{
            scale: 1.4,
            transition: {
              duration: 0.3,
              delay: 0,
              type: "tween",
              ease: "easeOut",
            },
          }}
        >
          {link.icon}
        </motion.a>
      ))}
    </>
  );
}

export default LinkButtons;
