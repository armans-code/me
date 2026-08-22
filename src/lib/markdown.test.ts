import { describe, expect, it } from "vitest";
import {
  homepageMarkdown,
  markdownForPath,
  markdownResponseBody,
} from "./markdown";
import { PERSON } from "./site";

describe("homepageMarkdown", () => {
  it("starts with an H1 and contains 500+ characters", () => {
    const markdown = homepageMarkdown();
    expect(markdown.startsWith(`# ${PERSON.name}`)).toBe(true);
    expect(markdown.length).toBeGreaterThanOrEqual(500);
  });
});

describe("markdownForPath", () => {
  it("serves home, thoughts index, and published thoughts", () => {
    expect(markdownForPath("/")).toContain(`# ${PERSON.name}`);
    expect(markdownForPath("/index.md")).toContain(`# ${PERSON.name}`);
    expect(markdownForPath("/thoughts")).toContain("# Thoughts");
    expect(markdownForPath("/thoughts/1")).toContain(
      "Wearable AI that remembers everything I see and hear",
    );
    expect(markdownForPath("/thoughts/2")).toContain(
      "AI products generate more signal",
    );
  });

  it("returns null for unknown paths", () => {
    expect(markdownForPath("/definitely-not-a-real-path")).toBeNull();
  });
});

describe("markdownResponseBody", () => {
  it("returns 200 for known pages and 404 markdown for unknown ones", () => {
    expect(markdownResponseBody("/").status).toBe(200);
    const missing = markdownResponseBody("/some-path-that-does-not-exist");
    expect(missing.status).toBe(404);
    expect(missing.body).toContain("https://armank.dev/llms.txt");
    expect(missing.body).toContain("https://armank.dev/sitemap.xml");
  });
});
