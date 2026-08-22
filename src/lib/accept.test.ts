import { describe, expect, it } from "vitest";
import {
  applyNegotiationHeaders,
  preferredType,
} from "./accept";

describe("preferredType", () => {
  it("defaults to HTML when Accept is missing or empty", () => {
    expect(preferredType(null)).toBe("text/html");
    expect(preferredType("")).toBe("text/html");
  });

  it("selects markdown when it is the only acceptable type", () => {
    expect(preferredType("text/markdown")).toBe("text/markdown");
  });

  it("selects markdown when it appears before HTML at the same q", () => {
    expect(preferredType("text/markdown, text/html")).toBe("text/markdown");
    expect(preferredType("text/markdown, text/html;q=0.8")).toBe(
      "text/markdown",
    );
  });

  it("selects HTML for typical browser Accept headers", () => {
    expect(
      preferredType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ),
    ).toBe("text/html");
  });

  it("selects HTML for */*", () => {
    expect(preferredType("*/*")).toBe("text/html");
  });

  it("honors q=0 rejections instead of letting */* override", () => {
    expect(preferredType("text/html;q=0, */*;q=1")).toBe("text/markdown");
    expect(preferredType("text/markdown;q=0, text/html;q=0, */*;q=0")).toBe(
      null,
    );
  });

  it("returns null when nothing produced is acceptable", () => {
    expect(preferredType("application/pdf")).toBe(null);
    expect(preferredType("application/json")).toBe(null);
  });
});

describe("applyNegotiationHeaders", () => {
  it("sets Vary: Accept, Accept-Encoding on a bare response", () => {
    const headers = new Headers();
    applyNegotiationHeaders(headers);
    expect(headers.get("Vary")).toBe("Accept, Accept-Encoding");
  });

  it("appends Accept to an existing Next.js Vary list", () => {
    const headers = new Headers({
      Vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
    });
    applyNegotiationHeaders(headers);
    const vary = headers.get("Vary") ?? "";
    expect(vary.toLowerCase()).toContain("accept");
    expect(vary.toLowerCase()).toContain("accept-encoding");
    expect(vary).toContain("rsc");
  });

  it("does not duplicate Accept", () => {
    const headers = new Headers({ Vary: "Accept" });
    applyNegotiationHeaders(headers);
    expect(headers.get("Vary")).toBe("Accept, Accept-Encoding");
  });
});
