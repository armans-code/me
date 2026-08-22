import { describe, expect, it } from "vitest";
import { notFoundMarkdown } from "./not-found";

describe("notFoundMarkdown", () => {
  it("gives agents a markdown recovery body with sitemap and llms.txt", () => {
    const body = notFoundMarkdown();

    expect(body.startsWith("# Not found")).toBe(true);
    expect(body).toContain("https://armank.dev/llms.txt");
    expect(body).toContain("https://armank.dev/sitemap.xml");
    expect(body).toContain("https://armank.dev/");
    expect(body).toMatch(/- \[llms\.txt\]\(/);
    expect(body).toMatch(/- \[Sitemap\]\(/);
  });
});
