import { describe, expect, it } from "vitest";
import { HOME_LINES, homePlainText, PERSON } from "./site";

describe("homepage text without JavaScript", () => {
  it("includes a person name suitable for an H1", () => {
    expect(PERSON.name.length).toBeGreaterThan(0);
    expect(homePlainText()).toContain(PERSON.name);
  });

  it("exposes substantial homepage copy without JavaScript", () => {
    const text = homePlainText();
    expect(text.length).toBeGreaterThan(400);
    expect(HOME_LINES.join("\n").length).toBeGreaterThan(300);
  });

  it("points The Context Company at the public company site", () => {
    expect(PERSON.worksFor.url).toBe("https://www.thecontextcompany.com/");
    expect(HOME_LINES.join("\n")).toContain(PERSON.worksFor.name);
  });

  it("keeps the homepage bio short on past roles and outreach", () => {
    const copy = HOME_LINES.join("\n");
    expect(copy).toContain(
      "previously: mintlify, apten, revisiondojo, solace health.",
    );
    expect(copy).toContain("please reach out to me and say hi!");
    expect(copy).not.toContain("software engineer intern");
    expect(copy).not.toContain("please feel free to reach out");
  });
});
