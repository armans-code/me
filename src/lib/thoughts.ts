import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Thought = {
  id: string;
  title: string;
  date: string;
  label: string;
  image: string | null;
  imageAlt: string | null;
  content: string;
};

const thoughtsDirectory = path.join(process.cwd(), "content/thoughts");

export function getThoughtIds(): string[] {
  if (!fs.existsSync(thoughtsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(thoughtsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
    .sort((a, b) => Number(b) - Number(a));
}

export function getThought(id: string): Thought | null {
  const fullPath = path.join(thoughtsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    label: String(data.label ?? id),
    image: typeof data.image === "string" ? data.image : null,
    imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : null,
    content,
  };
}

export function getAllThoughts(): Thought[] {
  return getThoughtIds()
    .map((id) => getThought(id))
    .filter((thought): thought is Thought => thought !== null);
}

const SKIPPED_BLOCK_RE = /^(#{1,6}\s|>\s*|```|---|<)/;

export function thoughtExcerpt(thought: Thought, maxLength = 160): string {
  const block = thought.content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part.length > 0 && !SKIPPED_BLOCK_RE.test(part));

  if (!block) {
    return thought.title;
  }

  const plain = block
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_~`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) {
    return plain;
  }
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}
