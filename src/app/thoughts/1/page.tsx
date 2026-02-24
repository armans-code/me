import Link from "next/link";

function Page() {
  return (
    <div className="md:w-3/5 w-4/5 flex flex-col gap-4">
      <div className="relative mb-4">
        <h1 className="absolute -left-5">
          <Link className="hover:underline" href="/">
            home
          </Link>{" "}
          /{" "}
          <Link className="hover:underline" href="/thoughts">
            thoughts
          </Link>{" "}
          / <span className="text-orange-300">one</span>
        </h1>
      </div>
      <div className="mt-4">
        <h1 className="-left-5 relative text-lg">
          Wearable AI that remembers everything I see and hear
        </h1>
        <p className="-left-5 relative text-gray-400">04/24/2025</p>
      </div>
      <div className="relative">
        <p className="absolute -left-5">&gt;</p>
        <h1 className="text-indigo-300">motivation</h1>
      </div>
      <p>
        In the last year, this project idea has repeatedly come to mind: a
        wearable AI personal assistant that remembers everything I see and hear.
      </p>
      <p>
        A number of problems have led me to this idea. A few examples include:
      </p>
      <div className="ml-5">
        <p>
          - A desire to collect a large amount of data about my everyday life to
          reveal relationships and patterns I may not have noticed
        </p>
        <p>
          - Not remembering simple things (e.g. asking myself at the grocery
          store, &quot;Do I have enough milk at home?&quot;)
        </p>
        <p>
          - Wanting to ask an LLM questions about what&apos;s on the chalkboard
          during a live lecture
        </p>
      </div>
      <p>
        This project genuinely doesn&apos;t leave my mind - I&apos;ve thought about it
        almost every single day for the last few months. I&apos;m not exactly sure
        why it piques my interest so much, but I know I want to work on it. I&apos;m
        planning on spending most of my free time in the next few months working
        on this and hope to have a reasonable proof of concept by the end of the
        summer.
      </p>
      <div className="relative">
        <p className="absolute -left-5">&gt;</p>
        <h1 className="text-indigo-300">progress and implementation</h1>
      </div>
      <p>
        Smart glasses can <i>easily</i> capture everything we see and hear in
        our waking life, so collecting and storing the data is trivial. Actually
        ingesting this data in a useful way for accurate memory is the hard
        part.
      </p>
      <p>
        I&apos;ve been tinkering with both long context and various RAG techniques to
        solve this. Using just RAG with frame embeddings has poor results when
        it comes to understanding motion or relationships within scenes. On the
        other hand, Gemini&apos;s long context window solves these problems and is
        great with video memory, as seen in{" "}
        <Link
          href="https://www.youtube.com/watch?v=nXVvvRhiGjI"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Google&apos;s Project Astra
        </Link>
        . But even a context window this big isn&apos;t large enough to store context
        about my entire day (12+ hours of footage), let alone a week.
      </p>
      <p>
        I&apos;m currently experimenting with a combination of RAG and graph memory.
        Ideally, RAG lets us send only relevant clips to the LLM, while
        (multimodal?) graph memory stores complex relationships.
      </p>
      <div className="relative">
        <p className="absolute -left-5">&gt;</p>
        <h1 className="text-indigo-300">i could really use some help</h1>
      </div>
      <p>
        Please do reach out if you have any ideas on how I can make this a
        reality or if you&apos;re interested in helping me build this out!
      </p>
      <p>
        I&apos;m no expert in agentic AI (I&apos;ve mostly stuck to web dev), but I&apos;m
        attempting to learn as much as I can to make this happen.
      </p>
    </div>
  );
}

export default Page;
