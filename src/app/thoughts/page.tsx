import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getAllThoughts } from "@/lib/thoughts";

function Page() {
  const thoughts = getAllThoughts();

  return (
    <div className="md:w-3/5 w-4/5 flex flex-col gap-8">
      <PageHeader>
        <Link className="hover:underline" href="/">
          home
        </Link>{" "}
        /{" "}
        <span className="text-orange-600 dark:text-orange-300">thoughts</span>
      </PageHeader>
      {thoughts.map((thought) => (
        <Link
          key={thought.id}
          href={`/thoughts/${thought.id}`}
          className="relative -left-5 hover:underline max-w-fit"
        >
          <span className="text-indigo-600 dark:text-indigo-300">
            {thought.id}.
          </span>{" "}
          {thought.title}{" "}
          <span className="text-sm text-muted">({thought.date})</span>
        </Link>
      ))}
    </div>
  );
}

export default Page;
