import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Thought = {
  id: string;
  title: string;
  date: string;
  label: string;
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
    content,
  };
}

export function getAllThoughts(): Thought[] {
  return getThoughtIds()
    .map((id) => getThought(id))
    .filter((thought): thought is Thought => thought !== null);
}
