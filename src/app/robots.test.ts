import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("allows crawlers and points at the sitemap", () => {
    const file = robots();
    expect(file.sitemap).toBe("https://armank.dev/sitemap.xml");
    expect(file.host).toBe("https://armank.dev");
    expect(file.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
