import { motion } from "framer-motion";

function LinkButton({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <motion.a
      href={href}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.a>
  );
}

export default LinkButton;
