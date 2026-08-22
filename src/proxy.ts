import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { applyNegotiationHeaders, preferredType } from "@/lib/accept";
import { markdownHeaders, notAcceptableBody } from "@/lib/http";
import { markdownResponseBody } from "@/lib/markdown";
import { markdownAlternatePath } from "@/lib/paths";
import { absoluteUrl } from "@/lib/site";

const HTML_VARY =
  "Accept, Accept-Encoding, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch";

function withHtmlDiscoveryHeaders(
  headers: Headers,
  pathname: string,
): void {
  applyNegotiationHeaders(headers);
  headers.set("Vary", HTML_VARY);
  const describedBy = `<${absoluteUrl("/llms.txt")}>; rel="describedby"`;
  const alternate = `<${markdownAlternatePath(pathname)}>; rel="alternate"; type="text/markdown"`;
  const existingLink = headers.get("Link");
  headers.set(
    "Link",
    existingLink ? `${existingLink}, ${describedBy}, ${alternate}` : `${describedBy}, ${alternate}`,
  );
}

function markdownResponse(pathname: string): Response {
  const path = pathname.endsWith(".md") ? pathname.slice(0, -3) || "/" : pathname;
  const { body, status } = markdownResponseBody(path);
  return new Response(body, {
    status,
    headers: markdownHeaders(path),
  });
}

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.endsWith(".md")) {
    return markdownResponse(pathname);
  }

  const acceptHeader = req.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    return markdownResponse(pathname);
  }

  if (chosen === null && acceptHeader) {
    return new Response(notAcceptableBody(), {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    });
  }

  const res = NextResponse.next();
  withHtmlDiscoveryHeaders(res.headers, pathname);
  return res;
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_vercel/|llms\\.txt|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|woff|woff2)$).*)",
  ],
};
