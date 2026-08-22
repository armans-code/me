export function normalizeContentPath(pathname: string): string {
  let path = pathname.trim();
  if (path.endsWith(".md")) {
    path = path.slice(0, -3);
  }
  if (path === "/index" || path === "index") {
    return "";
  }
  return path.replace(/^\/+|\/+$/g, "");
}

export function markdownAlternatePath(pathname: string): string {
  const normalized = normalizeContentPath(pathname);
  return normalized === "" ? "/index.md" : `/${normalized}.md`;
}
