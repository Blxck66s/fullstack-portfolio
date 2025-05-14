import { reverseKebabCase } from "@/lib/utils";
import { Layers } from "lucide-react";
import { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type tsItems = {
  name: string;
  icon: ReactNode | null;
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
    { name: "TypeScript", icon: null },
    { name: "JavaScript", icon: null },
    { name: "HTML", icon: null },
    { name: "CSS", icon: null },
  ],
  frontend: {
    frameworks: [
      { name: "React", icon: null },
      { name: "Next.js", icon: null },
      { name: "Vite", icon: null },
    ],
    libraries: [
      { name: "Tailwind CSS", icon: null },
      { name: "Shadcn/ui", icon: null },
      { name: "Zustand", icon: null },
    ],
  },
  backend: {
    frameworks: [
      { name: "Node.js", icon: null },
      { name: "Express.js", icon: null },
      { name: "NestJS", icon: null },
    ],
    libraries: [
      { name: "Prisma", icon: null },
      { name: "Sequelize", icon: null },
      { name: "Mongoose", icon: null },
    ],
  },
  database: [
    { name: "PostgreSQL", icon: null },
    { name: "MySQL", icon: null },
    { name: "MongoDB", icon: null },
  ],
  other: {
    technologies: [
      { name: "Git", icon: null },
      { name: "REST", icon: null },
      { name: "WebSockets", icon: null },
      { name: "Redis", icon: null },
    ],
    doc_tools: [
      { name: "Swagger", icon: null },
      { name: "Postman", icon: null },
      { name: "Apidog", icon: null },
    ],
  },
  on_going_learning: {
    languages: [
      { name: "Go", icon: null },
      { name: "Python", icon: null },
    ],
    frameworks: [
      { name: "Next.js", icon: null },
      { name: "FastAPI", icon: null },
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
      <span className="flex items-center gap-2">
        <Layers />
        <h3>My Tech Stack</h3>
      </span>
      <div className="flex w-full flex-wrap items-center justify-center">
        {Object.entries(tsData).map(([category, items]) => {
          return (
            <>
              <div
                key={category}
                className="w-full p-2 max-sm:text-center sm:min-h-40 sm:w-1/2 md:min-h-56 md:w-1/3"
              >
                <h4 className="py-2 text-2xl font-semibold sm:text-xl">
                  {reverseKebabCase(category)}
                </h4>
                <div className="flex flex-col gap-2 text-sm">
                  {Array.isArray(items) ? (
                    <div className="flex flex-wrap justify-center gap-2">
                      {items.map((item) => (
                        <Badge key={item.name} variant="secondary">
                          {item.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    Object.entries(items).map(([subcategory, subItems]) => (
                      <div
                        key={subcategory}
                        className="flex flex-col flex-wrap gap-2"
                      >
                        <h5 className="text-md font-semibold">
                          {reverseKebabCase(subcategory)}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {subItems.map((item) => (
                            <Badge key={item.name} variant="secondary">
                              {item.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <Separator className="my-4 hidden max-sm:block" />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default TechStack;
