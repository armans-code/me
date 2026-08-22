import { llmsTxt, llmsTxtContentType } from "@/lib/llms-txt";

export const runtime = "nodejs";

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": llmsTxtContentType(),
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
    },
  });
}
