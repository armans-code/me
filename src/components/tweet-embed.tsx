import Image from "next/image";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import {
  fetchTweet,
  formatCompactCount,
  formatTweetDate,
  parseTweetUrl,
  tokenizeTweetText,
  tweetUrl,
} from "@/lib/tweet";

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#1d9bf0"
      aria-label="Verified account"
      role="img"
      className="h-4 w-4 shrink-0"
    >
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.92.81c.66 1.31 1.9 2.19 3.33 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
  );
}

function displayUrl(href: string): string {
  const withoutProtocol = href.replace(/^https?:\/\//, "");
  return withoutProtocol.length > 32
    ? `${withoutProtocol.slice(0, 32)}…`
    : withoutProtocol;
}

function TweetBody({ text }: { text: string }) {
  const linkClassName =
    "text-indigo-600 dark:text-indigo-300 hover:underline break-all";

  return (
    <p className="whitespace-pre-wrap">
      {tokenizeTweetText(text).map((token, index) => {
        if (token.type === "url") {
          return (
            <a
              key={index}
              href={token.value}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {displayUrl(token.value)}
            </a>
          );
        }
        if (token.type === "mention") {
          return (
            <a
              key={index}
              href={`https://x.com/${token.value.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {token.value}
            </a>
          );
        }
        if (token.type === "hashtag") {
          return (
            <a
              key={index}
              href={`https://x.com/hashtag/${token.value.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {token.value}
            </a>
          );
        }
        return <span key={index}>{token.value}</span>;
      })}
    </p>
  );
}

function TweetFallback({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-2 flex w-full items-center gap-3 rounded-2xl border border-border p-4 hover:underline"
    >
      <XLogo className="h-5 w-5 shrink-0" />
      <span className="truncate text-sm">View this post on X</span>
    </a>
  );
}

export default async function TweetEmbed({ url }: { url: string }) {
  const ref = parseTweetUrl(url);
  if (!ref) {
    return null;
  }

  const tweet = await fetchTweet(ref);
  if (!tweet) {
    return <TweetFallback url={tweetUrl(ref)} />;
  }

  const profileUrl = `https://x.com/${tweet.author.handle}`;

  return (
    <article className="my-2 flex w-full flex-col gap-3 rounded-2xl border border-border p-4">
      <div className="flex items-center gap-3">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
          aria-label={`${tweet.author.name} on X`}
        >
          {tweet.author.avatarUrl ? (
            <Image
              src={tweet.author.avatarUrl}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-lg"
            >
              {tweet.author.name.slice(0, 1)}
            </span>
          )}
        </a>
        <div className="min-w-0 flex-1 leading-snug">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold hover:underline"
          >
            <span className="truncate">{tweet.author.name}</span>
            {tweet.author.verified && <VerifiedBadge />}
          </a>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm text-muted"
          >
            @{tweet.author.handle}
          </a>
        </div>
        <a
          href={tweet.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View post on X"
          className="shrink-0"
        >
          <XLogo />
        </a>
      </div>

      <TweetBody text={tweet.text} />

      <div className="flex items-center gap-4 text-sm text-muted">
        <a
          href={tweet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {formatTweetDate(tweet.createdAt)}
        </a>
        <span className="ml-auto flex items-center gap-4">
          <a
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tweet.replies} replies`}
            className="flex items-center gap-1 hover:underline"
          >
            <MessageCircle className="h-4 w-4" />
            {formatCompactCount(tweet.replies)}
          </a>
          <a
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tweet.retweets} reposts`}
            className="flex items-center gap-1 hover:underline"
          >
            <Repeat2 className="h-4 w-4" />
            {formatCompactCount(tweet.retweets)}
          </a>
          <a
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tweet.likes} likes`}
            className="flex items-center gap-1 hover:underline"
          >
            <Heart className="h-4 w-4" />
            {formatCompactCount(tweet.likes)}
          </a>
        </span>
      </div>
    </article>
  );
}
