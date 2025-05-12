import GithubSvg from "@/assets/github.svg?react";
import GmailSvg from "@/assets/gmail.svg?react";
import LinkedinSvg from "@/assets/linkedin.svg?react";
import { FileDown } from "lucide-react";
import { Button } from "./ui/button";
import LinkButton from "./ui/link-button";

function Links() {
  return (
    <div className="flex h-10 w-full items-center justify-start gap-4 rounded-lg pt-3">
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
      <div className="flex w-full items-center justify-start gap-3">
        <LinkButton href="https://www.linkedin.com">
          <LinkedinSvg className="h-6 w-auto rounded-full sm:h-8" />
        </LinkButton>
        <LinkButton href="https://github.com">
          <GithubSvg className="fill-primary h-6 w-auto sm:h-8" />
        </LinkButton>
        <LinkButton href="mailto:crowz.gac@gmail.com">
          <GmailSvg className="h-6 w-auto rounded-full sm:h-8" />
        </LinkButton>
      </div>
    </div>
  );
}

export default Links;
