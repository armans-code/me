"use client";
import { useState } from "react";
import { submitMessage } from "../actions";
import Link from "next/link";

function page() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setSuccess(false);
    setLoading(true);

    if (message.trim().length < 1) {
      setSuccess(false);
      setError("message is required");
      setLoading(false);
      return;
    }

    await submitMessage(name, message)
      .then(() => {
        // sorry
        setName("");
        setMessage("");
        setError("");
        setSuccess(true);
        setLoading(false);
      })
      .catch(() => {
        setSuccess(false);
        setLoading(false);
        setError("something went wrong, dm me on twitter and i'll fix it");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24 text-white">
      <div className="w-4/5 lg:w-1/2">
        <div className="flex items-center gap-2 line-through">
          <p>write me a note below, i check these frequently</p>
        </div>
        <p>🚧 this page is down</p>
        {/* <p>🚧 this page is down because i'm out of free projects on supabase</p> */}
        {/* <p>will be switching to a different database provider soon!</p>
        <p>until then, the best way to reach me is via x.com dms</p> */}
        <form className="flex flex-col gap-4 mt-20 items-end">
          <div className="flex items-end w-full">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={75}
              placeholder="name (optional)"
              className="bg-transparent border-b border-white outline-none w-full"
            />
            <p className="text-xs border-b leading-none text-blue-300">
              {name.length}/75
            </p>
          </div>
          <div className="flex items-end w-full">
            <textarea
              maxLength={420}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              className="w-full bg-[#0f0f0f] outline-none h-48 border-b resize-none"
            />
            <p className="text-xs border-b leading-none text-blue-300">
              {message.length}/420
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <Link className="hover:underline underline-offset-4" href="/">
              [go back]
            </Link>
            {loading ? (
              <p>[...]</p>
            ) : (
              <p
                onClick={handleSubmit}
                className="hover:text-blue-300 hover:underline underline-offset-4 cursor-pointer"
              >
                [submit]
              </p>
            )}
          </div>
          {success ? (
            <p className="w-full text-green-400">
              thanks for your message, i'll read it soon {":>"}
            </p>
          ) : null}
          {error.length > 0 ? (
            <p className="w-full text-red-400">{error}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default page;
