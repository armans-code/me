import { describe, expect, it } from "vitest";
import { markdownAlternatePath, normalizeContentPath } from "./paths";

describe("content paths", () => {
  it("normalizes slashes, .md siblings, and index to the homepage key", () => {
    expect(normalizeContentPath("/")).toBe("");
    expect(normalizeContentPath("/index.md")).toBe("");
    expect(normalizeContentPath("/thoughts/1.md")).toBe("thoughts/1");
    expect(normalizeContentPath("thoughts/")).toBe("thoughts");
  });

  it("builds .md alternate paths for negotiation discovery", () => {
    expect(markdownAlternatePath("/")).toBe("/index.md");
    expect(markdownAlternatePath("/thoughts")).toBe("/thoughts.md");
  });
});
