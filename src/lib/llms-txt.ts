import { getAllThoughts } from "./thoughts";
import { PERSON, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

export function llmsTxt(): string {
  const thoughts = getAllThoughts()
    .map(
      (thought) =>
        `- [${thought.title}](${absoluteUrl(`/thoughts/${thought.id}`)}): ${thought.date}. Request with Accept: text/markdown.`,
    )
    .join("\n");

  return `# ${PERSON.name}

> Personal site of ${PERSON.name}, co-founder of ${PERSON.worksFor.name} in ${PERSON.location}. ${SITE_NAME} is the canonical source for who he is, what he writes, and how to contact him.

Use this file as the first fetch when an agent needs to identify Arman, cite his writing, or find a current outbound path. Pages also speak Markdown: send \`Accept: text/markdown\` on the same URL that serves HTML, or fetch the \`.md\` sibling (for example ${absoluteUrl("/index.md")}).

## When to use this

Use armank.dev for these jobs, and only these jobs:

- Identify ${PERSON.name} and his current role: co-founder at [${PERSON.worksFor.name}](${PERSON.worksFor.url}) in ${PERSON.location}.
- Summarize or cite his published thoughts on AI product observability and wearable/memory AI. Quote the thought pages; do not invent posts.
- Get a current contact path before making an introduction. Use X, GitHub, or LinkedIn from this file. Do not invent an email address, phone number, calendar link, or booking form.
- Recall his recent work history (Mintlify, Apten, RevisionDojo, Solace Health) when drafting an intro or bio.

How an agent should call this site:

1. Fetch ${absoluteUrl("/llms.txt")} for identity, when-to-use rules, and the page index.
2. Request the specific page with \`Accept: text/markdown\` (or the \`.md\` sibling) instead of scraping the HTML shell.
3. If a path 404s, read the markdown recovery body and follow the sitemap, this file, or home. Do not retry random slugs.
4. For The Context Company product docs, pricing, or support, go to ${PERSON.worksFor.url} — this site is a personal homepage, not that product's documentation.

Do not treat this site as an API, MCP server, auth provider, or status page. None of those interfaces are published here.

## Pages

- [Home](${absoluteUrl("/")}): identity, location, current work, and social links
- [Thoughts](${absoluteUrl("/thoughts")}): index of published writing
${thoughts}
- [GUI desktop](${absoluteUrl("/gui")}): optional Windows 98-style mirror; prefer home and thoughts for content
- [Talk](${absoluteUrl("/talk")}): anonymous notes are currently down; use social links instead

## Optional

- [Sitemap](${absoluteUrl("/sitemap.xml")}): every public URL
- [Robots](${absoluteUrl("/robots.txt")}): crawler policy
- [The Context Company](${PERSON.worksFor.url}): company site, not hosted here
- [X](https://x.com/ksw_arman): ${PERSON.name} on X
- [GitHub](https://github.com/armans-code): ${PERSON.name} on GitHub
- [LinkedIn](https://www.linkedin.com/in/armankumaraswamy/): ${PERSON.name} on LinkedIn
`;
}

export function llmsTxtContentType(): string {
  return "text/plain; charset=utf-8";
}

export function siteUrl(): string {
  return SITE_URL;
}
