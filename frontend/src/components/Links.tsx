import GithubSvg from "@/assets/github.svg?react";
import GmailSvg from "@/assets/gmail.svg?react";
import LinkedinSvg from "@/assets/linkedin.svg?react";
import { FileDown } from "lucide-react";
import { Button } from "./ui/button";
import LinkButton from "./ui/link-button";

function Links() {
  return (
    <div className="flex h-10 w-full items-center justify-start gap-5 px-5">
      <Button>
        <FileDown className="h-4 w-auto" />
        <a href="/Ken_Resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </Button>
      <LinkButton href="https://www.linkedin.com">
        <LinkedinSvg className="h-8 w-auto rounded-full" />
      </LinkButton>
      <LinkButton href="mailto:test@gmail.com">
        <GmailSvg className="h-8 w-auto rounded-full" />
      </LinkButton>
      <LinkButton href="https://github.com">
        <GithubSvg className="fill-primary h-8 w-auto" />
      </LinkButton>
    </div>
  );
}

export default Links;
