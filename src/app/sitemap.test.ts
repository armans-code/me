import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { SITE_URL } from "@/lib/site";

describe("sitemap", () => {
  it("lists home, thoughts, and the agent index", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(SITE_URL);
    expect(urls).toContain("https://armank.dev/thoughts");
    expect(urls).toContain("https://armank.dev/thoughts/1");
    expect(urls).toContain("https://armank.dev/llms.txt");
  });
});
