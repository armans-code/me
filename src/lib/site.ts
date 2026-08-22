export const SITE_URL = "https://armank.dev";
export const SITE_NAME = "arman's living room";

export const PERSON = {
  name: "Arman Kumaraswamy",
  givenName: "Arman",
  familyName: "Kumaraswamy",
  jobTitle: "Co-founder",
  location: "San Francisco, CA",
  description:
    "Arman Kumaraswamy is a co-founder at The Context Company in San Francisco. He writes TypeScript and works on AI products, with a focus on helping teams monitor and improve how agents perform for users.",
  worksFor: {
    name: "The Context Company",
    url: "https://thecontext.company/",
  },
  sameAs: [
    "https://x.com/ksw_arman",
    "https://github.com/armans-code",
    "https://www.linkedin.com/in/armankumaraswamy/",
  ],
} as const;

export const HOME_LINES = [
  "hi!",
  "i'm a co-founder at The Context Company - we help teams monitor and improve AI products. we turn traces, user feedback, and product signals into a clear picture of how agents actually perform.",
  "i love writing typescript and working in AI. previously: mintlify (software engineer intern), apten (software engineer intern), revisiondojo (software engineer), and solace health (software engineer intern).",
  "i'm a big believer in authentic, compounding relationships. please feel free to reach out to me on twitter, github, or linkedin. i also publish thoughts on AI products and side projects.",
] as const;

export const EXPERIENCE_TEXT = `mintlify (w22):
 - software engineer intern (may 2025 - august 2025)
 - Next.js, MongoDB, Express

apten (s24):
 - software engineer intern (may 2024 - july 2024)
 - Next.js, LangChain, AWS CDK

revisiondojo (f24):
 - software engineer (october 2023 - march 2024)
 - Next.js, PostgreSQL, NoSQL

solace health:
 - software engineer intern (july 2023 - october 2023)
 - Next.js, NestJS, PostgreSQL, Redis`;

export const SOCIALS_TEXT = `twitter: ksw_arman
github: armans-code
linkedin: armankumaraswamy`;

export const SOCIAL_LINKS = [
  { label: "twitter", href: "https://x.com/ksw_arman" },
  { label: "github", href: "https://github.com/armans-code" },
  { label: "linkedin", href: "https://www.linkedin.com/in/armankumaraswamy/" },
  { label: "thoughts", href: "/thoughts" },
] as const;

export function homePlainText(): string {
  return [
    PERSON.name,
    PERSON.location,
    ...HOME_LINES,
    SOCIAL_LINKS.map((link) => link.label).join(" "),
  ].join("\n");
}

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}
