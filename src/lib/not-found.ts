import { absoluteUrl } from "./site";

export function notFoundMarkdown(): string {
  return `# Not found

This path does not exist on armank.dev.

## Where to look next

- [Home](${absoluteUrl("/")}) — who Arman is and how to reach him
- [llms.txt](${absoluteUrl("/llms.txt")}) — site guide, when to use this, and page index
- [Sitemap](${absoluteUrl("/sitemap.xml")}) — every public URL
- [Thoughts](${absoluteUrl("/thoughts")}) — published writing
`;
}
