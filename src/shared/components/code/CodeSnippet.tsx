"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/shared/components/shadcn-ui/button";

type CodeSnippetProps = {
  code: string;
};

const CodeSnippet = ({ code }: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4 rounded-lg border border-gray-700 bg-gray-950">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="absolute top-2 right-2 border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </Button>
      <pre className="thin-scrollbar overflow-auto p-4 pr-12 text-xs text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
