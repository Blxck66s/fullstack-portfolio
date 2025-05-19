import GramickHouseSVG from "@/assets/gramick-house.svg?react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { amirisBadgesData, ghBadgesData } from "@/data/timeline";
import TechStackBadge from "./TechStackBadge";
import { Timeline } from "./ui/timeline";

const workData = [
  {
    logo: <GramickHouseSVG className="h-10 w-10" viewBox="0 0 50 50" />,
    title: "Jan 2023 - Dec 2024",
    content: (
      <div className="text-sm">
        <p className="mb-1 text-lg font-medium">GramickHouse</p>
        <p className="mb-1 font-medium text-neutral-500">
          Backend Developer (Intern & Full-time)
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>
            Started as an intern for 3 months, debugging and maintaining content
            publishing platform and other projects.
          </li>
          <li>
            Developed full-stack task management tool for internal Projects.
          </li>
          <li>
            Worked on projects across Agri-Tech, E-Commerce, and Smart City
            projects.
          </li>
        </ul>

        <p className="mt-2 mb-1 font-medium">Key Contributions:</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>Agriculture Drone data analytics dashboard</li>
          <li>Agriculture Drone platform backend</li>
          <li>E-Commerce platform backend</li>
        </ul>

        <p className="mt-2 mb-1 font-medium">Technologies:</p>
        <div className="flex flex-wrap gap-1">
          <TechStackBadge items={ghBadgesData} small />
        </div>
      </div>
    ),
  },
  {
    logo: (
      <img
        src="/amiris.gif"
        alt="amiris-logo"
        className="h-10 w-10 rounded-full bg-white p-0.5"
      />
    ),
    title: "Jan 2025 - Present",
    content: (
      <div className="text-sm">
        <p className="mb-1 text-lg font-medium">The Amiris</p>
        <p className="mb-1 font-medium text-neutral-500">
          Full Stack Web Developer (Full-time)
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>Short-term job (4-6 months) helping family business</li>
          <li>Rebuilding theamiris.com website</li>
          <li>Developed payroll system</li>
          <li>Making site faster and easier to use</li>
        </ul>
        <p className="mt-2 mb-1 font-medium">Technologies:</p>
        <div className="flex flex-wrap gap-1">
          <TechStackBadge items={amirisBadgesData} small />
        </div>
      </div>
    ),
  },
];
const educationData = [
  {
    logo: (
      <img
        src="/sripatum-university.jpg"
        alt="sripatum-logo"
        loading="lazy"
        className="h-10 w-10 rounded-full bg-white p-0.5"
      />
    ),
    title: "2019 - 2023",
    content: (
      <div className="text-sm">
        <p className="mb-1 text-lg font-medium">Sripatum University</p>
        <p className="mb-1 font-medium text-neutral-500">
          Bachelor of Science in Business Computer, Information and
          Communication Technology (ICT)
        </p>
      </div>
    ),
  },
  {
    logo: (
      <img
        src="/codecamp.jpg"
        alt="codecamp-logo"
        loading="lazy"
        className="h-10 w-10 rounded-full bg-white p-0.5"
      />
    ),
    title: "Jul 2022 - Nov 2022",
    content: (
      <div className="text-sm">
        <p className="mb-1 text-lg font-medium">Software Park CodeCamp</p>
        <p className="mb-1 font-medium text-neutral-500">
          Full Stack JavaScript Web Developer (Apprenticeship)
        </p>
        <p className="mt-2 mb-1 font-medium">
          Intensive training course as full-stack developer. Experiences
          included:
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>
            Personal e-commerce web development project using React.js, Tailwind
            CSS, Git, MySQL, and Node.js.
          </li>
          <li>Learned MERN stack, TypeScript, and more</li>
        </ul>
      </div>
    ),
  },
];

function TimelineTabs() {
  return (
    <Tabs
      defaultValue="work"
      className="h-full w-full max-w-2xl min-w-xs rounded-lg lg:order-3"
    >
      <TabsList className="w-full">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline data={workData} />
      </TabsContent>
      <TabsContent value="education">
        <Timeline data={educationData} />
      </TabsContent>
    </Tabs>
  );
}

export default TimelineTabs;
