import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { notFoundMarkdown } from "@/lib/not-found";

export default function NotFound() {
  return (
    <div className="py-12 w-full flex flex-col justify-center items-center">
      <div className="md:w-3/5 w-4/5 flex flex-col gap-4">
        <PageHeader>
          <Link className="hover:underline" href="/">
            home
          </Link>{" "}
          /{" "}
          <span className="text-orange-600 dark:text-orange-300">404</span>
        </PageHeader>
        <div className="relative -left-5 mt-4 mb-4 flex flex-col gap-4">
          <h2>Not found</h2>
          <p>&gt; this path does not exist on armank.dev.</p>
          <p>&gt; where to look next:</p>
          <div className="flex sm:flex-row flex-col gap-4 text-indigo-600 dark:text-indigo-300">
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/"
            >
              [home]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/llms.txt"
            >
              [llms.txt]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/sitemap.xml"
            >
              [sitemap]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/thoughts"
            >
              [thoughts]
            </Link>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-muted">
            {notFoundMarkdown()}
          </pre>
        </div>
      </div>
    </div>
  );
}
