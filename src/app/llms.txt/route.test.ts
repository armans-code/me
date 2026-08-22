import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("serves the agent instruction file", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(body.startsWith("# Arman Kumaraswamy")).toBe(true);
    expect(body).toContain("## When to use this");
  });
});
