"use client";
import React, { useEffect, useRef, useState } from "react";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type File = {
  fileName: string;
  minimized: boolean;
  id: string;
};

type WindowPosition = {
  [key: string]: {
    x: number;
    y: number;
  };
};

type WindowSize = {
  [key: string]: {
    width: number;
    height: number;
  };
};

const MiniDesktop = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<File[]>([]);
  const [windowPositions, setWindowPositions] = useState<WindowPosition>({});
  const [windowSizes, setWindowSizes] = useState<WindowSize | null>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lastClickTime, setLastClickTime] = useState(0);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [catImage, setCatImage] = useState<string>("");
  const router = useRouter();
  const windowIdCounter = useRef(0);

  useEffect(() => {
    const getCat = async () => {
      const image = await fetch(
        `https://cataas.com/cat?width=300&height=300`
      ).then((data) => data.blob());
      const imageUrl = URL.createObjectURL(image);
      setCatImage(imageUrl);
    };
    getCat();
  }, []);

  const files: {
    [key: string]: string;
  } = {
    Terminal: "under construction... 🚧",
    "armank.dev":
      "hi! my name is arman, i'm studying computer science and mathematics at the university of florida.\n\ni like full-stack web dev and typescript.\n\nfeel free to reach out to me!",
    "experience.txt":
      "apten (s24):\n - software engineer intern (may 2024 - july 2024)\n - Next.js, LangChain, AWS CDK\n\nstudydojo (f24):\n - software engineer (october 2023 - march 2024)\n - Next.js, PostgreSQL, NoSQL\n\nsolace health:\n - software engineer intern (july 2023 - october 2023)\n - Next.js, NestJS, PostgreSQL, Redis",
    "socials.txt":
      "twitter: ksw_arman\ngithub: armans-code\nlinkedin: armankumaraswamy",
    "cat.png": "🐈",
  };

  const handleFileClick = (fileName: string, e: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - lastClickTime;

    if (e.currentTarget.id === "desktop-container") {
      setSelectedFile(null);
      return;
    }

    // TODO: make this dblclick event?
    if (timeSinceLastClick < 300 && selectedFile === fileName) {
      if (!openWindows.find((w) => w.fileName === fileName)) {
        if (fileName === "Terminal") {
          router.push("/");
          setLastClickTime(currentTime);
          return;
        }
        windowIdCounter.current += 1;
        const newWindow = {
          fileName,
          minimized: false,
          id: `window-${windowIdCounter.current}`,
        };
        setOpenWindows((prev) => [...prev, newWindow]);
        setWindowPositions((prev) => ({
          ...prev,
          [newWindow.id]: {
            x: 20 + openWindows.length * 20,
            y: 40 + openWindows.length * 20,
          },
        }));
        setWindowSizes((prev) => ({
          ...prev,
          [newWindow.id]: { width: 350, height: 350 },
        }));
        setActiveWindow(newWindow.id);
      }
    } else {
      setSelectedFile(fileName);
    }

    setLastClickTime(currentTime);
  };

  const handleWindowMouseDown = (windowId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-title-bar")) {
      setIsDragging(windowId);
      const windowRect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - windowRect.left,
        y: e.clientY - windowRect.top,
      });
      setActiveWindow(windowId);
      e.preventDefault();
    }
  };

  const handleResizeStart = (windowId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(windowId);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
    });
    setActiveWindow(windowId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const container = document.getElementById("desktop-container")!;
      const containerRect = container.getBoundingClientRect();
      const windowElement = document.getElementById(isDragging)!;
      const windowRect = windowElement.getBoundingClientRect();

      let newX = e.clientX - containerRect.left - dragOffset.x;
      let newY = e.clientY - containerRect.top - dragOffset.y;

      newX = Math.max(
        0,
        Math.min(newX, containerRect.width - windowRect.width)
      );
      newY = Math.max(
        0,
        Math.min(newY, containerRect.height - 40 - windowRect.height)
      );

      setWindowPositions((prev) => ({
        ...prev,
        [isDragging]: { x: newX, y: newY },
      }));
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      setWindowSizes((prev) =>
        prev
          ? {
              ...prev,
              [isResizing]: {
                width: Math.max(200, prev[isResizing].width + deltaX),
                height: Math.max(150, prev[isResizing].height + deltaY),
              },
            }
          : null
      );

      setResizeStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setIsResizing(null);
  };

  const toggleMinimize = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId
          ? { ...window, minimized: !window.minimized }
          : window
      )
    );
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== windowId));
    setWindowPositions((prev) => {
      const newPositions = { ...prev };
      delete newPositions[windowId];
      return newPositions;
    });
    setWindowSizes((prev) => {
      const newSizes = { ...prev };
      delete newSizes[windowId];
      return newSizes;
    });
  };

  return (
    <div
      id="desktop-container"
      className="w-full h-screen relative overflow-hidden"
      style={{ backgroundColor: "#6fb5b7" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={(e) =>
        setSelectedFile((s) =>
          e.currentTarget?.id === "desktop-container" ? null : s
        )
      }
    >
      {/* Desktop Icons */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 w-fit p-4">
        {Object.keys(files).map((fileName) => (
          <div
            key={fileName}
            className={`flex flex-col items-center cursor-pointer p-2 rounded
              ${selectedFile === fileName ? "bg-blue-100" : "hover:bg-gray-200"}
              ${selectedFile === fileName ? "text-blue-600" : "text-black"}
            `}
            onClick={(e) => handleFileClick(fileName, e)}
          >
            <Image
              alt="File Icon"
              width={64}
              height={64}
              src={
                fileName === "Terminal"
                  ? "https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
                  : fileName === "cat.png"
                  ? "https://static.vecteezy.com/system/resources/thumbnails/025/221/361/small_2x/cartoon-cat-cute-ai-generate-png.png"
                  : "https://win98icons.alexmeub.com/icons/png/file_lines-0.png"
              }
              className={`w-8 h-8 select-none ${
                selectedFile === fileName ? "text-blue-500" : "text-blue-400"
              }`}
            />
            <span
              className={`text-sm mt-1 px-1 rounded text-center select-none
              ${selectedFile === fileName ? "bg-blue-500 text-white" : ""}`}
            >
              {fileName}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map(
        (window) =>
          !window.minimized && (
            <div
              key={window.id}
              id={window.id}
              className="absolute select-none bg-gray-200 rounded-none shadow-lg"
              style={{
                left: `${windowPositions[window.id]?.x}px`,
                top: `${windowPositions[window.id]?.y}px`,
                width: `${windowSizes ? windowSizes[window.id]?.width : 0}px`,
                height: `${windowSizes ? windowSizes[window.id]?.height : 0}px`,
                cursor: isDragging === window.id ? "grabbing" : "auto",
                zIndex: activeWindow === window.id ? 10 : 1,
                border: "2px solid #c0c0c0",
                borderTop: "2px solid #dfdfdf",
                borderLeft: "2px solid #dfdfdf",
                boxShadow: "inset -2px -2px #0a0a0a, inset 2px 2px #fff",
              }}
              onMouseDown={(e) => handleWindowMouseDown(window.id, e)}
            >
              {/* Window Title Bar */}
              <div
                className="window-title-bar flex items-center justify-between h-6 cursor-grab active:cursor-grabbing"
                style={{
                  background: "#000080",
                  padding: "2px 3px",
                }}
              >
                <span className="text-sm font-normal text-white select-none">
                  {window.fileName === "cat.png"
                    ? "cat.png"
                    : `Notepad - ${window.fileName}`}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleMinimize(window.id)}
                    className="w-4 h-4 bg-gray-200 hover:bg-gray-400 flex items-center justify-center"
                    style={{
                      border: "1px solid #000",
                      borderRight: "1px solid #848484",
                      borderBottom: "1px solid #848484",
                    }}
                  >
                    <span className="text-xs mb-2">_</span>
                  </button>
                  <button
                    onClick={() => closeWindow(window.id)}
                    className="w-4 h-4 bg-gray-200 hover:bg-gray-400 flex items-center justify-center"
                    style={{
                      border: "1px solid #000",
                      borderRight: "1px solid #848484",
                      borderBottom: "1px solid #848484",
                    }}
                  >
                    <span className="text-xs">×</span>
                  </button>
                </div>
              </div>

              {/* Menu Bar */}
              <div className="bg-gray-200 text-xs border-b border-gray-400 px-1 py-0.5">
                <span className="px-2 hover:bg-gray-400">File</span>
                <span className="px-2 hover:bg-gray-400">Edit</span>
                <span className="px-2 hover:bg-gray-400">Format</span>
                <span className="px-2 hover:bg-gray-400">Help</span>
              </div>

              {/* Window Content */}
              <div className="bg-white h-[calc(100%-44px)] p-1">
                {window.fileName === "cat.png" ? (
                  <>
                    <p>tip: try reloading the page</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={catImage}
                      alt="Random cat"
                      className="w-full h-[90%] object-cover"
                    />
                  </>
                ) : (
                  <textarea
                    className="w-full h-full resize-none p-1 border-none focus:outline-none font-mono text-sm"
                    style={{
                      background: "white",
                    }}
                    value={files[window.fileName]}
                    readOnly
                  />
                )}
              </div>

              {/* Resize Handle */}
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(window.id, e)}
                style={{
                  background: "transparent",
                }}
              />
            </div>
          )
      )}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-1 space-x-1"
        style={{
          background: "#c0c0c0",
          borderTop: "2px solid #dfdfdf",
        }}
      >
        <Link href="/" className="absolute right-0 mr-4 hover:underline">
          prefer a CLI?
        </Link>
        {openWindows.map((window) => (
          <button
            key={window.id}
            className="h-6 px-2 flex items-center select-none"
            style={{
              background: activeWindow === window.id ? "#bdbdbd" : "#c0c0c0",
              border: "2px solid #808080",
              borderTop: "2px solid #fff",
              borderLeft: "2px solid #fff",
            }}
            onClick={() => {
              if (window.minimized) {
                toggleMinimize(window.id);
              }
              setActiveWindow(window.id);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://win98icons.alexmeub.com/icons/png/file_lines-0.png"
              alt="File icon"
              className="w-4 h-4 mr-2"
            />
            <span className="text-sm truncate max-w-[120px] select-none">
              <p>{window.fileName}</p>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniDesktop;
