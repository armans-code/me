import { markdownHeaders } from "@/lib/http";
import { markdownResponseBody } from "@/lib/markdown";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const pathname = `/${slug.join("/")}`;
  const { body, status } = markdownResponseBody(pathname);

  return new Response(body, {
    status,
    headers: markdownHeaders(pathname),
  });
}
