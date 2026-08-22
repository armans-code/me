import { describe, expect, it } from "vitest";
import { HOME_LINES, homePlainText, PERSON } from "./site";

describe("homepage text without JavaScript", () => {
  it("includes a person name suitable for an H1", () => {
    expect(PERSON.name.length).toBeGreaterThan(0);
    expect(homePlainText()).toContain(PERSON.name);
  });

  it("exposes 500+ characters of raw homepage copy", () => {
    const text = homePlainText();
    expect(text.length).toBeGreaterThanOrEqual(500);
    expect(HOME_LINES.join("\n").length).toBeGreaterThan(400);
  });
});
