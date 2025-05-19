import { TechStackItem } from "@/data/tech-stack";
import clsx from "clsx";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";

function TechStackBadge({
  items,
  small,
}: {
  items: TechStackItem[] | undefined;
  small?: boolean;
}) {
  if (!items) return null;
  return (
    <>
      {items.map((item, index) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.4,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            key={item.name}
          >
            <Badge
              variant="outline"
              className={clsx("flex items-center gap-2 p-1 px-1.5", {
                "border-0 text-[0.6rem]": small,
              })}
            >
              {item.icon && (
                <img
                  src={`/tech-stack/${item.icon}`}
                  alt={item.name}
                  loading="lazy"
                  className={clsx("rounded bg-transparent object-contain", {
                    "h-4 w-4": small,
                    "h-5 w-5": !small,
                  })}
                />
              )}
              {item.name}
            </Badge>
          </motion.div>
        );
      })}
    </>
  );
}

export default TechStackBadge;
