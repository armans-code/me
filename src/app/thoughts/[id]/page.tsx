import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import ThoughtMarkdown from "@/components/thought-markdown";
import { getThought, getThoughtIds } from "@/lib/thoughts";

export function generateStaticParams() {
  return getThoughtIds().map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const thought = getThought(id);

  if (!thought) {
    notFound();
  }

  return (
    <div className="md:w-3/5 w-4/5 flex flex-col gap-4">
      <PageHeader>
        <Link className="hover:underline" href="/">
          home
        </Link>{" "}
        /{" "}
        <Link className="hover:underline" href="/thoughts">
          thoughts
        </Link>{" "}
        /{" "}
        <span className="text-orange-600 dark:text-orange-300">
          {thought.label}
        </span>
      </PageHeader>
      <div className="mt-4">
        <h1 className="-left-5 relative text-lg">{thought.title}</h1>
        <p className="-left-5 relative text-muted">{thought.date}</p>
      </div>
      <ThoughtMarkdown content={thought.content} />
    </div>
  );
}
