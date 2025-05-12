import amirisLogo from "@/assets/amiris.gif";
import GramickHouseSVG from "@/assets/gramick-house.svg?react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "./ui/timeline";

function TimelineTabs() {
  return (
    <Tabs defaultValue="work" className="mb-1000 w-full rounded-lg">
      <TabsList className="w-full">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline
          data={[
            {
              logo: (
                <GramickHouseSVG className="h-10 w-10" viewBox="0 0 50 50" />
              ),
              title: "2023",
              content: (
                <p>
                  Backend Developer @GramickHouse Started as an intern,
                  responsible for debugging and maintaining a content publishing
                  web platform using Express.js and MongoDB. During the
                  internship, I developed a full-stack internal task management
                  tool, similar to Trello, using React and Express.js. After
                  being hired full-time, I contributed to a variety of projects
                  across Agri-Tech, E-Commerce, and Smart City domains. Key
                  Contributions: Developed and maintained a drone data dashboard
                  system using Express.js and PostgreSQL (Sequelize) Built the
                  backend and collaborated on database design with a senior
                  developer for an agriculture platform, using NestJS and
                  PostgreSQL (Prisma) — supporting both a mobile app (Client)
                  and admin web panel Helped Build the backend structure for
                  Smart Parking and E-Wallet systems Technologies Used:
                  TypeScript, NestJS, Express.js, React, Prisma, Sequelize,
                  Mongoose, PostgreSQL, MongoDB
                </p>
              ),
            },
            {
              logo: (
                <img
                  src={amirisLogo}
                  alt="amiris-logo"
                  className="h-10 w-10 rounded-full bg-white p-0.5"
                />
              ),
              title: "2025",
              content: (
                <p>
                  Full-Stack Developer @The Amiris Engaged temporarily (4–6
                  months) to support the family business during a period of
                  expansion. Leading the revamp and redevelopment of
                  www.theamiris.com and related digital systems. Responsible for
                  enhancing performance, streamlining functionality, and
                  supporting key operational platforms, including payroll
                  systems. Collaborate with digital marketing teams and
                  developers to align the digital infrastructure with the
                  company’s growth strategy.
                </p>
              ),
            },
          ]}
        />
      </TabsContent>
      <TabsContent value="education">Change your education here.</TabsContent>
    </Tabs>
  );
}

export default TimelineTabs;
