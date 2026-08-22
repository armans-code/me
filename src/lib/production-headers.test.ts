import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("production Vary configuration", () => {
  it("keeps Accept on Vercel responses so HTML and markdown do not share a cache entry", () => {
    const vercel = readFileSync("vercel.json", "utf8");
    const nextConfig = readFileSync("next.config.ts", "utf8");

    expect(vercel).toContain("Accept, Accept-Encoding");
    expect(nextConfig).toContain("Accept, Accept-Encoding");
    expect(vercel).toContain("((?!_next/static|_next/image).*)");
    expect(nextConfig).toContain("((?!_next/static|_next/image).*)");
  });
});
