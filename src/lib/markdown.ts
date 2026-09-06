import { getAllThoughts, getThought } from "./thoughts";
import { notFoundMarkdown } from "./not-found";
import { normalizeContentPath } from "./paths";
import {
  EXPERIENCE_TEXT,
  HOME_LINES,
  PERSON,
  SITE_NAME,
  SOCIAL_LINKS,
  absoluteUrl,
} from "./site";

export { markdownAlternatePath, normalizeContentPath } from "./paths";

function withCompanyMarkdownLink(line: string): string {
  return line.replaceAll(
    PERSON.worksFor.name,
    `[${PERSON.worksFor.name}](${PERSON.worksFor.url})`,
  );
}

export function homepageMarkdown(): string {
  const links = SOCIAL_LINKS.map((link) => {
    const href = link.href.startsWith("http")
      ? link.href
      : absoluteUrl(link.href);
    return `- [${link.label}](${href})`;
  }).join("\n");

  return `# ${PERSON.name}

${PERSON.location}

${HOME_LINES.map((line) => `> ${withCompanyMarkdownLink(line)}`).join("\n\n")}

## Links

${links}

## Experience

\`\`\`
${EXPERIENCE_TEXT}
\`\`\`

Request this URL with \`Accept: text/markdown\` or fetch ${absoluteUrl("/llms.txt")} for the site index.
`;
}

function thoughtsIndexMarkdown(): string {
  const thoughts = getAllThoughts();
  const list = thoughts
    .map(
      (thought) =>
        `- [${thought.title}](${absoluteUrl(`/thoughts/${thought.id}`)}) (${thought.date})`,
    )
    .join("\n");

  return `# Thoughts

Writing by ${PERSON.name}.

${list || "No thoughts published yet."}
`;
}

function thoughtMarkdown(id: string): string | null {
  const thought = getThought(id);
  if (!thought) return null;

  return `# ${thought.title}

_${thought.date}_

${thought.content.trim()}
`;
}

function shortPageMarkdown(
  title: string,
  body: string,
  href: string,
): string {
  return `# ${title}

${body}

- [Home](${absoluteUrl("/")})
- [This page](${absoluteUrl(href)})
`;
}

export function markdownForPath(pathname: string): string | null {
  const path = normalizeContentPath(pathname);

  switch (path) {
    case "":
      return homepageMarkdown();
    case "thoughts":
      return thoughtsIndexMarkdown();
    case "gui":
    case "desktop":
      return shortPageMarkdown(
        "GUI desktop",
        "A Windows 98-style GUI mirror of this site. The HTML homepage and thoughts pages are the canonical content.",
        `/${path}`,
      );
    case "talk":
      return shortPageMarkdown(
        "Talk",
        "The anonymous note form is currently down. Reach Arman on X, GitHub, or LinkedIn instead.",
        "/talk",
      );
    default: {
      const thoughtMatch = /^thoughts\/([^/]+)$/.exec(path);
      if (thoughtMatch?.[1]) {
        return thoughtMarkdown(thoughtMatch[1]);
      }
      return null;
    }
  }
}

export function markdownResponseBody(pathname: string): {
  body: string;
  status: number;
} {
  const body = markdownForPath(pathname);
  if (body) {
    return { body, status: 200 };
  }

  return { body: notFoundMarkdown(), status: 404 };
}

export function siteTitleMarkdown(): string {
  return SITE_NAME;
}
