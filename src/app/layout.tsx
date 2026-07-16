import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "arman's living room",
  description: "arman's living room",
  keywords: [
    "arman",
    "kumaraswamy",
    "arman kumaraswamy",
    "arman's living room",
    "armank",
    "armank.dev",
    "armank dev",
  ],
};

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    var resolved = theme === "light" ? "light" : "dark";
    document.documentElement.classList.add(resolved);
    document.documentElement.classList.remove(resolved === "light" ? "dark" : "light");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistMono.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
