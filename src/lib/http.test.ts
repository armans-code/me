import { describe, expect, it } from "vitest";
import { MARKDOWN_CONTENT_TYPE, markdownHeaders } from "./http";

describe("markdownHeaders", () => {
  it("declares markdown and a single Vary that includes Accept", () => {
    const headers = markdownHeaders("/");
    const vary = headers.get("Vary");

    expect(headers.get("Content-Type")).toBe(MARKDOWN_CONTENT_TYPE);
    expect(vary).toBe("Accept, Accept-Encoding");
    expect(vary?.toLowerCase().split(",").map((part) => part.trim())).toContain(
      "accept",
    );
  });
});
