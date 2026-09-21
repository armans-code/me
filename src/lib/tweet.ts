export type TweetRef = {
  id: string;
  handle: string | null;
};

const TWEET_URL_RE =
  /^https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/(?:i\/status\/(\d+)|([A-Za-z0-9_]{1,15})\/status\/(\d+))/;

export function parseTweetUrl(value: string): TweetRef | null {
  const match = TWEET_URL_RE.exec(value.trim());
  if (!match) {
    return null;
  }

  const id = match[1] ?? match[3];
  if (!id) {
    return null;
  }

  return { id, handle: match[2] ?? null };
}

export function tweetUrl(ref: TweetRef): string {
  return ref.handle
    ? `https://x.com/${ref.handle}/status/${ref.id}`
    : `https://x.com/i/status/${ref.id}`;
}

export function formatTweetDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCompactCount(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export type TweetToken =
  | { type: "text"; value: string }
  | { type: "url"; value: string }
  | { type: "mention"; value: string }
  | { type: "hashtag"; value: string };

const TOKEN_RE = /(https?:\/\/[^\s]+)|(@[A-Za-z0-9_]+)|(#[A-Za-z0-9_]+)/g;
const TRAILING_URL_PUNCTUATION_RE = /[.,!?;:)\]]+$/;

export function tokenizeTweetText(text: string): TweetToken[] {
  const tokens: TweetToken[] = [];
  let cursor = 0;

  for (const match of text.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      tokens.push({ type: "text", value: text.slice(cursor, index) });
    }

    const [full, url, mention, hashtag] = match;
    if (url) {
      const trailing = TRAILING_URL_PUNCTUATION_RE.exec(url)?.[0] ?? "";
      const clean = trailing ? url.slice(0, -trailing.length) : url;
      tokens.push({ type: "url", value: clean });
      if (trailing) {
        tokens.push({ type: "text", value: trailing });
      }
    } else if (mention) {
      tokens.push({ type: "mention", value: mention });
    } else if (hashtag) {
      tokens.push({ type: "hashtag", value: hashtag });
    } else {
      tokens.push({ type: "text", value: full });
    }

    cursor = index + full.length;
  }

  if (cursor < text.length) {
    tokens.push({ type: "text", value: text.slice(cursor) });
  }

  return tokens;
}

export type EmbeddedTweet = {
  id: string;
  url: string;
  text: string;
  createdAt: string;
  author: {
    name: string;
    handle: string;
    avatarUrl: string | null;
    verified: boolean;
  };
  replies: number;
  retweets: number;
  likes: number;
};

type FxTwitterResponse = {
  code?: unknown;
  tweet?: {
    url?: unknown;
    id?: unknown;
    text?: unknown;
    created_at?: unknown;
    author?: {
      name?: unknown;
      screen_name?: unknown;
      avatar_url?: unknown;
      verification?: { verified?: unknown };
    };
    replies?: unknown;
    retweets?: unknown;
    likes?: unknown;
  };
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toEmbeddedTweet(data: FxTwitterResponse): EmbeddedTweet | null {
  const tweet = data.tweet;
  if (data.code !== 200 || !tweet) {
    return null;
  }

  const id = asString(tweet.id);
  const text = asString(tweet.text);
  const url = asString(tweet.url);
  const createdAt = asString(tweet.created_at);
  const name = asString(tweet.author?.name);
  const handle = asString(tweet.author?.screen_name);

  if (!id || !text || !url || !createdAt || !name || !handle) {
    return null;
  }

  return {
    id,
    url,
    text,
    createdAt,
    author: {
      name,
      handle,
      avatarUrl: asString(tweet.author?.avatar_url),
      verified: tweet.author?.verification?.verified === true,
    },
    replies: asNumber(tweet.replies),
    retweets: asNumber(tweet.retweets),
    likes: asNumber(tweet.likes),
  };
}

export async function fetchTweet(ref: TweetRef): Promise<EmbeddedTweet | null> {
  const apiUrl = `https://api.fxtwitter.com/${ref.handle ?? "i"}/status/${ref.id}`;

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as FxTwitterResponse;
    return toEmbeddedTweet(data);
  } catch {
    return null;
  }
}
