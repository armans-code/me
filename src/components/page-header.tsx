import { ThemeToggle } from "./theme-toggle";

type HeadingTag = "h1" | "p" | "div";

export function PageHeader({
  children,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  as?: HeadingTag;
}) {
  return (
    <div className="relative mb-4 flex min-h-6 items-baseline justify-between gap-4">
      <Tag className="relative -left-5 min-w-0">{children}</Tag>
      <ThemeToggle />
    </div>
  );
}
