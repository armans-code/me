import { describe, expect, it } from "vitest";
import {
  getThought,
  getThoughtIds,
  thoughtExcerpt,
  type Thought,
} from "./thoughts";

function makeThought(overrides: Partial<Thought> = {}): Thought {
  return {
    id: "99",
    title: "Some title",
    date: "09/21/2026",
    label: "test",
    image: null,
    imageAlt: null,
    content: "",
    ...overrides,
  };
}

describe("getThoughtIds", () => {
  it("lists published thoughts newest first", () => {
    expect(getThoughtIds()).toEqual(["3", "2", "1"]);
  });
});

describe("getThought", () => {
  it("parses header image frontmatter", () => {
    expect(getThought("3")).toMatchObject({
      title: "What Jev Means for the Future of Evals",
      image: "/thoughts/3.jpg",
      imageAlt: "Effective evals with Jev",
    });
  });

  it("returns null images for thoughts without one", () => {
    expect(getThought("1")).toMatchObject({ image: null, imageAlt: null });
  });

  it("returns null for unknown ids", () => {
    expect(getThought("nope")).toBeNull();
  });
});

describe("thoughtExcerpt", () => {
  it("uses the first prose block and strips markdown", () => {
    const thought = makeThought({
      content:
        "## a heading\n\nHello [world](https://example.com) with **bold** words.\n\nSecond paragraph.",
    });
    expect(thoughtExcerpt(thought)).toBe("Hello world with bold words.");
  });

  it("skips quotes, code, and dividers", () => {
    const thought = makeThought({
      content: "> quoted\n\n```tweet\nhttps://x.com/i/status/1\n```\n\nReal first line here.",
    });
    expect(thoughtExcerpt(thought)).toBe("Real first line here.");
  });

  it("truncates long blocks and falls back to the title", () => {
    const thought = makeThought({ content: `word `.repeat(100) });
    const excerpt = thoughtExcerpt(thought, 20);
    expect(excerpt.length).toBeLessThanOrEqual(20);
    expect(excerpt.endsWith("…")).toBe(true);
    expect(thoughtExcerpt(makeThought({ content: "" }))).toBe("Some title");
  });
});
