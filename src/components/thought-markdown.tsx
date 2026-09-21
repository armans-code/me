import Link from "next/link";
import { isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";
import TweetEmbed from "./tweet-embed";
import { parseTweetUrl } from "@/lib/tweet";

function isFootnoteItem(id: string | undefined): boolean {
  return Boolean(id?.includes("user-content-fn-"));
}

function childrenHaveFootnoteItems(children: ReactNode): boolean {
  return (Array.isArray(children) ? children : [children]).some(
    (child) =>
      child &&
      typeof child === "object" &&
      "props" in child &&
      isFootnoteItem((child as { props?: { id?: string } }).props?.id),
  );
}

function codeBlockText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(codeBlockText).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return codeBlockText(children.props.children);
  }
  return "";
}

function tweetBlockUrl(children: ReactNode): string | null {
  const child = Array.isArray(children) ? children[0] : children;
  if (!isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    return null;
  }
  const language = (child.props.className ?? "")
    .split(" ")
    .find((token) => token.startsWith("language-"));
  if (language !== "language-tweet") {
    return null;
  }
  const url = codeBlockText(child.props.children).trim().split(/\s+/)[0] ?? "";
  return parseTweetUrl(url) ? url : null;
}

const components: Components = {
  h2: ({ children, id, className }) => {
    if (id === "footnote-label") {
      return (
        <h2 id={id} className={className ?? "sr-only"}>
          {children}
        </h2>
      );
    }

    return (
      <div className="relative">
        <p className="absolute -left-5">&gt;</p>
        <h1 className="text-indigo-600 dark:text-indigo-300">{children}</h1>
      </div>
    );
  },
  p: ({ children }) => <p>{children}</p>,
  em: ({ children }) => <i>{children}</i>,
  strong: ({ children }) => (
    <span className="text-indigo-600 dark:text-indigo-300">{children}</span>
  ),
  a: ({ href, children, className, node: _node, ...props }) => {
    const isFootnoteLink =
      className?.includes("data-footnote-backref") ||
      "data-footnote-ref" in props ||
      "data-footnote-backref" in props;

    if (isFootnoteLink) {
      return (
        <a
          href={href}
          className="text-indigo-600 no-underline hover:underline dark:text-indigo-300"
          {...props}
        >
          {children}
        </a>
      );
    }

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
  blockquote: ({ children }) => (
    <blockquote className="border-l border-indigo-300/50 pl-4 text-muted">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => {
    const url = tweetBlockUrl(children);
    if (url) {
      return <TweetEmbed url={url} />;
    }
    return <pre>{children}</pre>;
  },
  sup: ({ children }) => (
    <sup className="ml-0.5 text-[0.7em] text-indigo-600 dark:text-indigo-300">
      {children}
    </sup>
  ),
  section: ({ children, node: _node, className, ...props }) => {
    if ("data-footnotes" in props) {
      return (
        <section
          {...props}
          className={[
            "mt-4 border-t border-border pt-4 text-sm text-muted",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </section>
      );
    }

    return (
      <section className={className} {...props}>
        {children}
      </section>
    );
  },
  ul: ({ children }) => (
    <div className="ml-5 flex flex-col gap-4">{children}</div>
  ),
  li: ({ children, id }) => {
    if (isFootnoteItem(id)) {
      return (
        <li id={id} className="ml-4 list-decimal">
          {children}
        </li>
      );
    }

    return <p>- {children}</p>;
  },
  ol: ({ children, node: _node, ...props }) => {
    if (childrenHaveFootnoteItems(children)) {
      return (
        <ol className="flex list-decimal flex-col gap-2" {...props}>
          {children}
        </ol>
      );
    }

    return <div className="ml-5 flex flex-col gap-4">{children}</div>;
  },
};

export default function ThoughtMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
