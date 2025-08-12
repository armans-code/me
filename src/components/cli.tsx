"use client";
import React, { useEffect, useState, useRef } from "react";

const INITIAL_FILES = [
  {
    name: "thoughts",
    content: "run 'cd thoughts' to see my thoughts on various topics",
  },
  {
    name: "experience.txt",
    content:
      "mintlify (w22):\n - software engineer intern (may 2025 - august 2025)\n - Next.js, MongoDB, Express\n\napten (s24):\n - software engineer intern (may 2024 - july 2024)\n - Next.js, LangChain, AWS CDK\n\nrevisiondojo (f24):\n - software engineer (october 2023 - march 2024)\n - Next.js, PostgreSQL, NoSQL\n\nsolace health:\n - software engineer intern (july 2023 - october 2023)\n - Next.js, NestJS, PostgreSQL, Redis",
  },
  {
    name: "socials.txt",
    content:
      "twitter: ksw_arman\ngithub: armans-code\nlinkedin: armankumaraswamy",
  },
  {
    name: "gui.app",
    content: "run './gui.app' to open the GUI version of this website",
  },
  // {
  //   name: "talk.app",
  //   content: "run './talk.app' to leave an anonymous note for me",
  // },
];

const commands = [
  "",
  "whoami",
  "ls",
  "help",
  "cd",
  "cat",
  "clear",
  "touch",
  "rm",
  "reset",
  "./gui.app",
  "./talk.app",
];

interface Message {
  message: string;
  type: "input" | "output";
}

interface File {
  name: string;
  content: string;
}

function CLI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>(INITIAL_FILES);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { message: input, type: "input" }]);
    if (commands.includes(input.toLowerCase().split(" ")[0])) {
      switch (input.toLowerCase()) {
        case "reset":
          setFiles(INITIAL_FILES);
          setMessages((prev) => [
            ...prev,
            {
              message: "Reset files to initial state",
              type: "output",
            },
          ]);
          break;
        case "whoami":
          setMessages((prev) => [
            ...prev,
            { message: "arman", type: "output" },
          ]);
          break;
        case "ls":
          setMessages((prev) => [
            ...prev,
            {
              message: files.map((file) => file.name).join("\n"),
              type: "output",
            },
          ]);
          break;
        case "help":
          setMessages((prev) => [
            ...prev,
            {
              message: commands
                .filter((c) => c !== "./talk.app")
                .join("\n")
                .slice(1),
              type: "output",
            },
          ]);
          break;
        case "clear":
          setMessages([]);
          break;
        case "./gui.app":
          setMessages((prev) => [
            ...prev,
            { message: "opening GUI...", type: "output" },
          ]);
          setTimeout(() => {
            window.location.href = "/gui";
          }, 300);
          break;
        case "./talk.app":
          setMessages((prev) => [
            ...prev,
            {
              message: "opening talk...",
              type: "output",
            },
          ]);
          setTimeout(() => {
            window.location.href = "/talk";
          }, 300);
          break;
        default:
          if (input.toLowerCase().startsWith("cat")) {
            const fileName = input.toLowerCase().split(" ")[1];
            if (!fileName) {
              setMessages((prev) => [
                ...prev,
                {
                  message: "usage: cat <filename> (e.g. cat file.txt)",
                  type: "output",
                },
              ]);
              break;
            }
            const file = files.find((file) => file.name === fileName);
            if (file) {
              setMessages((prev) => [
                ...prev,
                { message: file.content, type: "output" },
              ]);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  message: `cat: ${fileName}: No such file or directory`,
                  type: "output",
                },
              ]);
            }
          } else if (input.toLowerCase().startsWith("touch")) {
            const fileName = input.toLowerCase().split(" ")[1];
            if (!fileName) {
              setMessages((prev) => [
                ...prev,
                {
                  message: "usage: touch <filename> (e.g. touch file.txt)",
                  type: "output",
                },
              ]);
              break;
            }
            if (files.find((file) => file.name === fileName)) {
              setMessages((prev) => [
                ...prev,
                {
                  message: `touch: cannot touch '${fileName}': File exists`,
                  type: "output",
                },
              ]);
            } else {
              setInput("");
              try {
                const image = await fetch(
                  `https://cataas.com/cat?width=200&height=200`
                ).then((data) => data.blob());
                const imageUrl = URL.createObjectURL(image);
                // @ts-expect-error we are setting content to an image, not string
                setFiles((prev) => [
                  ...prev,
                  {
                    name: fileName,
                    content: (
                      <img
                        src={imageUrl}
                        alt="cat"
                        className="w-40 h-40 object-cover"
                      />
                    ),
                  },
                ]);
              } catch (error) {
                // in case we get rate limited
                setFiles((prev) => [
                  ...prev,
                  {
                    name: fileName,
                    content: "🐈",
                  },
                ]);
              }
              return;
            }
          } else if (input.toLowerCase().startsWith("rm")) {
            const fileName = input.toLowerCase().split(" ")[1];
            if (!fileName) {
              setMessages((prev) => [
                ...prev,
                {
                  message: "usage: rm <filename> (e.g. rm file.txt)",
                  type: "output",
                },
              ]);
              break;
            }
            if (files.find((file) => file.name === fileName)) {
              setFiles((prev) => prev.filter((file) => file.name !== fileName));
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  message: `rm: ${fileName}: No such file or directory`,
                  type: "output",
                },
              ]);
            }
          } else if (input.toLowerCase().startsWith("cd")) {
            if (input.toLowerCase().trim() === "cd") {
              setMessages((prev) => [
                ...prev,
                {
                  message: "",
                  type: "output",
                },
              ]);
              break;
            }
            if (input.toLowerCase().split(" ").length > 2) {
              setMessages((prev) => [
                ...prev,
                {
                  message: `cd: too many arguments`,
                  type: "output",
                },
              ]);
              break;
            }
            const directory = input.toLowerCase().split(" ")[1];
            if (directory == "thoughts") {
              window.location.href = "/thoughts";
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  message: `cd: no such file or directory: ${directory}`,
                  type: "output",
                },
              ]);
            }
          }
      }
    } else {
      setMessages((prev) => [
        ...prev,
        {
          message: `cli: command not found: ${input}`,
          type: "output",
        },
      ]);
    }
    setInput("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setInput(
          messages
            .filter((message) => message.type === "input")
            .map((message) => message.message)
            .pop() || ""
        );
      }
    };

    document.getElementById("cli")?.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [messages]);

  useEffect(() => {
    if (messages.length > 2) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full">
      {messages.map((message, i) => (
        <p
          key={i}
          className={
            message.type === "input"
              ? "text-indigo-300"
              : "text-green-300 whitespace-pre-wrap"
          }
        >
          <span className="text-indigo-300">
            {message.type === "input" ? "> " : ""}
          </span>
          {message.message}
        </p>
      ))}
      <div ref={bottomRef} />
      <form
        id="cli"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex">
          <span className="mr-2">$</span>
          <input
            type="text"
            placeholder={
              messages.length === 0 ? "type `help` for a list of commands" : ""
            }
            className="bg-transparent border-none outline-none flex-grow w-full"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default CLI;
