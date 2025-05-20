import GithubSvg from "@/assets/github.svg?react";
import GmailSvg from "@/assets/gmail.svg?react";
import LinkedinSvg from "@/assets/linkedin.svg?react";
import { FileDown } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import LinkButtons from "./ui/link-button";

const LinksData = [
  {
    name: "LinkedIn",
    icon: <LinkedinSvg className="h-6 w-auto rounded-full sm:h-8" />,
    href: "https://www.linkedin.com/in/thanandorneamtakoo",
  },
  {
    name: "GitHub",
    icon: <GithubSvg className="fill-primary h-6 w-auto sm:h-8" />,
    href: "https://github.com/Blxck66s",
  },
  {
    name: "Gmail",
    icon: <GmailSvg className="h-6 w-auto rounded-full sm:h-8" />,
    href: "mailto:crowz.gac@gmail.com",
  },
];

function Links() {
  return (
    <div className="flex h-10 w-full items-center justify-start gap-4 rounded-lg pt-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.6,
        }}
      >
        <Button className="h-6 w-fit gap-1 hover:cursor-pointer sm:h-8">
          <FileDown className="h-auto w-auto" />
          <a
            href="/Ken_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            Resume
          </a>
        </Button>
      </motion.div>
      <div className="flex w-full items-center justify-start gap-3">
        <LinkButtons data={LinksData} />
      </div>
    </div>
  );
}

export default Links;
