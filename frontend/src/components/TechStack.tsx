import { reverseKebabCase } from "@/lib/utils";
import { Layers } from "lucide-react";
import { motion } from "motion/react";
import TechStackBadge from "./TechStackBadge";

type tsItems = {
  name: string;
  icon: string | null;
};

type tsDataType = {
  [category: string]:
    | tsItems[]
    | {
        [subcategory: string]: tsItems[];
      };
};

const tsData: tsDataType = {
  language: [
    { name: "TypeScript", icon: "ts-logo.png" },
    { name: "JavaScript", icon: "js-logo.png" },
    { name: "HTML", icon: null },
    { name: "CSS", icon: null },
  ],
  database: [
    { name: "PostgreSQL", icon: "postgresql-logo.png" },
    { name: "MySQL", icon: "mysql-logo.png" },
    { name: "MongoDB", icon: "mongodb-logo.png" },
  ],
  frontend: {
    frameworks: [
      { name: "React (Vite)", icon: "react-logo.png" },
      { name: "Next.js", icon: "nextjs-logo.jpeg" },
    ],
    libraries: [
      { name: "Tailwind CSS", icon: "tailwindcss-logo.png" },
      { name: "Shadcn/ui", icon: "shadcn-ui-logo.png" },
      { name: "Zustand", icon: "zustand-logo.jpg" },
    ],
  },
  backend: {
    frameworks: [
      { name: "Node.js", icon: "nodejs-logo.png" },
      { name: "Express.js", icon: "express-js-logo.png" },
      { name: "NestJS", icon: "nestjs-logo.png" },
    ],
    libraries: [
      { name: "Prisma", icon: "prisma-logo.webp" },
      { name: "Sequelize", icon: "sequelize-logo.png" },
      { name: "Mongoose", icon: "mongoose-logo.png" },
    ],
  },
  other: {
    technologies: [
      { name: "Git", icon: "git-logo.png" },
      { name: "REST", icon: null },
      { name: "WebSockets", icon: null },
      { name: "Redis", icon: "redis-logo.png" },
    ],
    doc_tools: [
      { name: "Swagger", icon: "swagger-logo.png" },
      { name: "Postman", icon: "postman-logo.png" },
      { name: "Apidog", icon: "apidog-logo.png" },
    ],
  },
  on_going_learning: {
    languages: [
      { name: "Go", icon: "go-logo.png" },
      { name: "Python", icon: "python-logo.png" },
    ],
    frameworks: [
      { name: "Next.js", icon: "nextjs-logo.jpeg" },
      { name: "FastAPI", icon: "fastapi-logo.webp" },
    ],
    platforms: [
      { name: "Vercel", icon: null },
      { name: "Railway", icon: null },
    ],
  },
};

function TechStack() {
  return (
    <div className="w-full max-w-3xl rounded-lg border p-5 shadow-md max-[420px]:p-1">
      <span className="flex items-center justify-center gap-2 p-2 text-3xl font-bold">
        <Layers />
        <h3>My Tech Stack</h3>
      </span>
      <div className="flex w-full flex-wrap items-start justify-center">
        {Object.entries(tsData).map(([category, items], index) => {
          return (
            <div
              key={category}
              className="h-fit w-full p-2 min-[550px]:w-1/2 sm:min-h-30 md:min-h-70 md:w-1/3"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="bg-card rounded-lg p-2"
              >
                <h4 className="p-2 text-2xl font-semibold sm:text-xl">
                  {reverseKebabCase(category)}
                </h4>
                <div className="flex flex-col gap-2 rounded-lg text-sm">
                  {Array.isArray(items) ? (
                    <div className="flex flex-wrap items-center gap-2 rounded-lg p-2">
                      <TechStackBadge items={items} />
                    </div>
                  ) : (
                    Object.entries(items).map(([subcategory, subItems]) => (
                      <div
                        key={subcategory}
                        className="flex flex-col flex-wrap gap-2 max-sm:text-left"
                      >
                        <h5 className="text-md px-2 font-semibold text-neutral-400">
                          {reverseKebabCase(subcategory)}
                        </h5>
                        <div className="flex flex-wrap items-center gap-2 rounded-lg p-2">
                          <TechStackBadge items={subItems} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechStack;
