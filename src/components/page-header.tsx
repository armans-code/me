import { ThemeToggle } from "./theme-toggle";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mb-4 flex min-h-6 items-baseline justify-between gap-4">
      <h1 className="relative -left-5 min-w-0">{children}</h1>
      <ThemeToggle />
    </div>
  );
}
