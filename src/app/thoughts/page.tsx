import Link from "next/link";
import { getAllThoughts } from "@/lib/thoughts";

function Page() {
  const thoughts = getAllThoughts();

  return (
    <div className="md:w-3/5 w-4/5 flex flex-col gap-8">
      <div className="relative mb-4">
        <h1 className="absolute -left-5">
          <Link className="hover:underline" href="/">
            home
          </Link>{" "}
          / <span className="text-orange-300">thoughts</span>
        </h1>
      </div>
      {thoughts.map((thought) => (
        <Link
          key={thought.id}
          href={`/thoughts/${thought.id}`}
          className="relative -left-5 hover:underline max-w-fit"
        >
          <span className="text-indigo-300">{thought.id}.</span> {thought.title}{" "}
          <span className="text-sm text-gray-400">({thought.date})</span>
        </Link>
      ))}
    </div>
  );
}

export default Page;
