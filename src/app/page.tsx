import Link from "next/link";
import CLI from "../components/cli";
import { PageHeader } from "../components/page-header";
import { personJsonLd, serializeJsonLd } from "@/lib/json-ld";
import { HOME_LINES, PERSON, SOCIAL_LINKS } from "@/lib/site";

export default function Home() {
  const jsonLd = personJsonLd();

  return (
    <div className="py-12 w-full flex flex-col justify-center items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <div className="md:w-3/5 w-4/5 flex flex-col gap-4">
        <PageHeader as="p">
          <span className="text-orange-600 dark:text-orange-300">home</span>
        </PageHeader>
        <div className="relative -left-5 mt-4 mb-4 flex flex-col gap-4">
          <div>
            <h1>{PERSON.name}</h1>
            <p className="text-muted text-sm">{PERSON.location}</p>
          </div>
          {HOME_LINES.map((line) => (
            <p key={line}>&gt; {line}</p>
          ))}
          <div className="flex sm:flex-row flex-col gap-4 text-indigo-600 dark:text-indigo-300">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.label}
                className="hover:font-bold hover:underline underline-offset-4"
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                [{link.label}]
              </Link>
            ))}
          </div>
        </div>
        <div className="relative -left-5">
          <CLI />
        </div>
      </div>
    </div>
  );
}
