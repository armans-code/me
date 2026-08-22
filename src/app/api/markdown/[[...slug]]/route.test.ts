import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { PERSON } from "@/lib/site";

async function getMarkdown(slug: string[] = []) {
  return GET(new Request("https://armank.dev/api/markdown"), {
    params: Promise.resolve({ slug }),
  });
}

describe("GET /api/markdown", () => {
  it("serves homepage markdown with negotiation headers", async () => {
    const response = await getMarkdown([]);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(response.headers.get("Vary")?.toLowerCase()).toContain("accept");
    expect(body).toContain(`# ${PERSON.name}`);
    expect(body.length).toBeGreaterThanOrEqual(500);
  });

  it("returns markdown 404s with recovery links", async () => {
    const response = await getMarkdown(["some-path-that-does-not-exist"]);
    const body = await response.text();

    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(body).toContain("# Not found");
    expect(body).toContain("https://armank.dev/llms.txt");
    expect(body).toContain("https://armank.dev/sitemap.xml");
  });
});
