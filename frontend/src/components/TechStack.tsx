import { techStackData } from "@/data/tech-stack";
import { reverseKebabCase } from "@/lib/utils";
import clsx from "clsx";
import { Layers } from "lucide-react";
import { motion } from "motion/react";
import TechStackBadge from "./TechStackBadge";
import { GlowingEffect } from "./ui/glowing-effect";

function TechStack() {
  return (
    <div className="w-full max-w-2xl min-w-xs rounded-lg border p-5 shadow-md max-[420px]:p-2">
      <span className="flex items-center justify-center gap-2 p-2 text-3xl font-bold">
        <Layers />
        <h3>My Tech Stack</h3>
      </span>
      <div className="mt-5 grid grid-cols-1 gap-4 last:col-span-full sm:grid-cols-2">
        {Object.entries(techStackData).map(([category, items], index) => {
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
              key={category}
              className={clsx(
                "bg-card/30 relative flex h-full flex-col rounded-lg border p-3",
                {
                  "col-span-full":
                    index === Object.keys(techStackData).length - 1,
                },
              )}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <h4 className="p-2 text-2xl font-semibold sm:text-xl">
                {reverseKebabCase(category)}
              </h4>
              <div className="flex flex-wrap gap-2 rounded-lg text-sm">
                {Object.entries(items).map(([subcategory, subItems]) => (
                  <div
                    key={subcategory}
                    className="flex flex-col flex-wrap justify-center gap-2 max-sm:text-left"
                  >
                    <h5 className="text-md px-2 font-semibold text-neutral-400">
                      {reverseKebabCase(subcategory)}
                    </h5>
                    <div className="flex flex-wrap items-center gap-2 rounded-lg p-2">
                      <TechStackBadge items={subItems} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default TechStack;
