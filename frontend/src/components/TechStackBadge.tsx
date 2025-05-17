import { motion } from "motion/react";
import { Badge } from "./ui/badge";

const iconModules = import.meta.glob(
  "../assets/tech-stack/*.{png,jpg,webp,jpeg}",
  { eager: true },
) as Record<string, { default: string }>;

const iconMap = Object.fromEntries(
  Object.entries(iconModules).map(([path, m]) => {
    const name = path.split("/").pop()!;
    return [name, m.default];
  }),
);

function TechStackBadge({
  items,
}: {
  items: { name: string; icon: string | null }[];
}) {
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
              className="flex items-center gap-2 p-1 px-1.5"
            >
              {item.icon && (
                <img
                  src={iconMap[item.icon]}
                  alt={item.name}
                  loading="lazy"
                  className="h-5 w-5 rounded bg-transparent object-contain"
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
