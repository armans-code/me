import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children }) => (
    <div className="relative">
      <p className="absolute -left-5">&gt;</p>
      <h1 className="text-indigo-300">{children}</h1>
    </div>
  ),
  p: ({ children }) => <p>{children}</p>,
  em: ({ children }) => <i>{children}</i>,
  strong: ({ children }) => (
    <span className="text-indigo-300">{children}</span>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");

    return (
      <Link
        href={href ?? "#"}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="underline decoration-blue-500 underline-offset-4"
      >
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <div className="ml-5 flex flex-col gap-4">{children}</div>
  ),
  li: ({ children }) => <p>- {children}</p>,
  ol: ({ children }) => (
    <div className="ml-5 flex flex-col gap-4">{children}</div>
  ),
};

export default function ThoughtMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
