import { describe, expect, it } from "vitest";
import { llmsTxt, llmsTxtContentType } from "./llms-txt";
import { PERSON } from "./site";

describe("llmsTxt", () => {
  it("follows the llmstxt.org document shape", () => {
    const text = llmsTxt();
    const lines = text.split("\n");

    expect(lines[0]).toBe(`# ${PERSON.name}`);
    expect(text).toMatch(/^# .+\n\n> /);
    expect(text).toContain("## When to use this");
    expect(text).toContain("## Pages");
    expect(text).toContain("## Optional");
    expect(text).toMatch(/- \[Home\]\(https:\/\/armank\.dev\/\)/);
    expect(text).toMatch(/- \[Thoughts\]\(https:\/\/armank\.dev\/thoughts\)/);
    expect(text).toContain("https://armank.dev/thoughts/1");
    expect(text).toContain("https://armank.dev/thoughts/2");
  });

  it("names specific jobs and how an agent should call the site", () => {
    const text = llmsTxt();
    expect(text).toContain("Accept: text/markdown");
    expect(text).toContain("Do not invent an email address");
    expect(text).toContain("The Context Company");
    expect(text).toContain("https://www.thecontextcompany.com/");
    expect(text).toContain("Fetch https://armank.dev/llms.txt");
  });

  it("uses a text/plain content type for the well-known file", () => {
    expect(llmsTxtContentType()).toBe("text/plain; charset=utf-8");
  });
});
