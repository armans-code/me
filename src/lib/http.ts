import { applyNegotiationHeaders } from "./accept";
import { markdownAlternatePath } from "./paths";
import { absoluteUrl } from "./site";

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

export function markdownHeaders(pathname: string): Headers {
  const headers = new Headers({
    "Content-Type": MARKDOWN_CONTENT_TYPE,
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
  });
  applyNegotiationHeaders(headers);
  headers.append(
    "Link",
    `<${absoluteUrl("/llms.txt")}>; rel="describedby"`,
  );
  headers.append(
    "Link",
    `<${markdownAlternatePath(pathname)}>; rel="alternate"; type="text/markdown"`,
  );
  return headers;
}

export function notAcceptableBody(): string {
  return "Not Acceptable\n\nAvailable: text/html, text/markdown\n";
}
