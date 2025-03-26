
import React from 'react';
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, language, showLineNumbers = false, children, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn(
          "relative rounded-md bg-slate-950 text-white px-4 py-3 overflow-x-auto font-mono text-sm",
          showLineNumbers && "pl-12 counter-reset-line",
          className
        )}
        {...props}
      >
        {language && (
          <div className="absolute top-2 right-2 text-xs text-slate-400 px-2 py-1 rounded bg-slate-800">
            {language}
          </div>
        )}
        <code className={cn("font-mono text-sm", showLineNumbers && "counter-increment-line relative")}>{children}</code>
      </pre>
    );
  }
);

CodeBlock.displayName = "CodeBlock";
