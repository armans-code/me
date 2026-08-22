import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { applyNegotiationHeaders, preferredType } from "@/lib/accept";
import { notAcceptableBody } from "@/lib/http";
import { markdownAlternatePath } from "@/lib/paths";
import { absoluteUrl } from "@/lib/site";

function withDiscoveryHeaders(
  headers: Headers,
  pathname: string,
): void {
  applyNegotiationHeaders(headers);
  const existingLink = headers.get("Link");
  const describedBy = `<${absoluteUrl("/llms.txt")}>; rel="describedby"`;
  const alternate = `<${markdownAlternatePath(pathname)}>; rel="alternate"; type="text/markdown"`;
  headers.set(
    "Link",
    existingLink ? `${existingLink}, ${describedBy}, ${alternate}` : `${describedBy}, ${alternate}`,
  );
}

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.endsWith(".md")) {
    const url = req.nextUrl.clone();
    url.pathname = `/api/markdown${pathname.slice(0, -3) || "/"}`;
    const rewritten = NextResponse.rewrite(url);
    withDiscoveryHeaders(rewritten.headers, pathname);
    return rewritten;
  }

  const acceptHeader = req.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = req.nextUrl.clone();
    url.pathname = `/api/markdown${pathname === "/" ? "" : pathname}`;
    const rewritten = NextResponse.rewrite(url);
    withDiscoveryHeaders(rewritten.headers, pathname);
    return rewritten;
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
  withDiscoveryHeaders(res.headers, pathname);
  return res;
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_vercel/|llms\\.txt|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|woff|woff2)$).*)",
  ],
};
