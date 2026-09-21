import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import ThoughtMarkdown from "@/components/thought-markdown";
import { markdownAlternatePath } from "@/lib/paths";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { getThought, getThoughtIds, thoughtExcerpt } from "@/lib/thoughts";

export function generateStaticParams() {
  return getThoughtIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const thought = getThought(id);

  if (!thought) {
    return {};
  }

  const title = `${thought.title} — ${SITE_NAME}`;
  const description = thoughtExcerpt(thought);
  const pathname = `/thoughts/${thought.id}`;
  const url = absoluteUrl(pathname);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: {
        "text/markdown": markdownAlternatePath(pathname),
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      ...(thought.image
        ? {
            images: [
              {
                url: absoluteUrl(thought.image),
                alt: thought.imageAlt ?? thought.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: thought.image ? "summary_large_image" : "summary",
      title,
      description,
      ...(thought.image ? { images: [absoluteUrl(thought.image)] } : {}),
    },
  };
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
      {thought.image && (
        <div className="relative aspect-[5/2] w-full overflow-hidden rounded-xl">
          <Image
            src={thought.image}
            alt={thought.imageAlt ?? thought.title}
            fill
            priority
            sizes="(min-width: 768px) 60vw, 80vw"
            className="object-cover"
          />
        </div>
      )}
      <ThoughtMarkdown content={thought.content} />
    </div>
  );
}
