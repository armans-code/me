import { describe, expect, it } from "vitest";
import {
  formatCompactCount,
  formatTweetDate,
  parseTweetUrl,
  tokenizeTweetText,
  tweetUrl,
} from "./tweet";

describe("parseTweetUrl", () => {
  it("parses x.com status urls with a handle", () => {
    expect(
      parseTweetUrl("https://x.com/stokebuilder/status/2101379908194943224"),
    ).toEqual({ id: "2101379908194943224", handle: "stokebuilder" });
  });

  it("parses twitter.com and i/status urls, ignoring query params", () => {
    expect(
      parseTweetUrl("https://twitter.com/ksw_arman/status/123?s=20"),
    ).toEqual({ id: "123", handle: "ksw_arman" });
    expect(parseTweetUrl("https://x.com/i/status/456")).toEqual({
      id: "456",
      handle: null,
    });
  });

  it("returns null for non-status urls", () => {
    expect(parseTweetUrl("https://x.com/stokebuilder")).toBeNull();
    expect(parseTweetUrl("https://x.com/home")).toBeNull();
    expect(parseTweetUrl("not a url")).toBeNull();
    expect(parseTweetUrl("")).toBeNull();
  });
});

describe("tweetUrl", () => {
  it("builds canonical x.com urls", () => {
    expect(tweetUrl({ id: "123", handle: "someone" })).toBe(
      "https://x.com/someone/status/123",
    );
    expect(tweetUrl({ id: "456", handle: null })).toBe(
      "https://x.com/i/status/456",
    );
  });
});

describe("formatTweetDate", () => {
  it("formats tweet timestamps like Sep 19, 2026", () => {
    expect(formatTweetDate("Sat Sep 19 18:36:26 +0000 2026")).toBe(
      "Sep 19, 2026",
    );
    expect(formatTweetDate("2026-09-21T15:52:53.000Z")).toBe("Sep 21, 2026");
  });

  it("returns the input when it cannot parse a date", () => {
    expect(formatTweetDate("yesterday-ish")).toBe("yesterday-ish");
  });
});

describe("formatCompactCount", () => {
  it("compacts large counts", () => {
    expect(formatCompactCount(62)).toBe("62");
    expect(formatCompactCount(1200)).toBe("1.2K");
    expect(formatCompactCount(2500000)).toBe("2.5M");
  });
});

describe("tokenizeTweetText", () => {
  it("splits text, urls, mentions, and hashtags", () => {
    expect(tokenizeTweetText("hello @world, see https://example.com/a#b!")).toEqual([
      { type: "text", value: "hello " },
      { type: "mention", value: "@world" },
      { type: "text", value: ", see " },
      { type: "url", value: "https://example.com/a#b" },
      { type: "text", value: "!" },
    ]);
    expect(tokenizeTweetText("shipping #agents today")).toEqual([
      { type: "text", value: "shipping " },
      { type: "hashtag", value: "#agents" },
      { type: "text", value: " today" },
    ]);
  });

  it("returns plain text as a single token", () => {
    expect(tokenizeTweetText("just words")).toEqual([
      { type: "text", value: "just words" },
    ]);
  });
});
