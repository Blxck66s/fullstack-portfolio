export type TechStackItem = {
  name: string;
  icon: string | null;
};

export const techStackData = {
  core: {
    languages: [
      { name: "TypeScript", icon: "ts-logo.png" },
      { name: "JavaScript", icon: "js-logo.png" },
      { name: "HTML", icon: null },
      { name: "CSS", icon: null },
    ],
    databases: [
      { name: "PostgreSQL", icon: "postgresql-logo.png" },
      { name: "MySQL", icon: "mysql-logo.png" },
      { name: "MongoDB", icon: "mongodb-logo.png" },
    ],
  },
  frontend: {
    frameworks: [
      { name: "React", icon: "react-logo.png" },
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
