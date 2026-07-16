import Link from "next/link";
import CLI from "../components/cli";

export default function Home() {
  return (
    <div className="text-gray-300 py-12 w-full flex flex-col justify-center items-center">
      <div className="md:w-3/5 w-4/5 flex flex-col gap-4">
        <div className="relative mb-4">
          <h1 className="absolute -left-5">
            <span className="text-orange-300">home</span>
          </h1>
        </div>
        <div className="relative -left-5 mt-4 mb-4 flex flex-col gap-4">
          <div>
            <p>Arman Kumaraswamy</p>
            <p className="text-gray-400 text-sm">San Francisco, CA</p>
          </div>
          <p>&gt; hi!</p>
          <p>
            &gt; i&apos;m a co-founder at{" "}
            <Link
              href="https://thecontext.company/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-blue-500 underline-offset-4"
            >
              The Context Company
            </Link>{" "}
            - we help teams monitor and improve AI products.
          </p>
          <p>&gt; i love writing typescript and working in AI.</p>
          <p>
            &gt; i&apos;m a big believer in authentic, compounding
            relationships. please feel free to reach out to me!
          </p>
          {/* <p>
            &gt; currently interning at{" "}
            <Link
              className="underline decoration-green-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://mintlify.com/"
            >
              Mintlify
            </Link>{" "}
            and attempting to{" "}
            <Link
              className="underline decoration-orange-300"
              href="/thoughts/1"
            >
              index my life for LLMs
            </Link>
          </p> */}
          <div className="flex sm:flex-row flex-col gap-4 text-indigo-300">
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://x.com/ksw_arman"
              target="_blank"
              rel="noopener noreferrer"
            >
              [twitter]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://github.com/armans-code"
              target="_blank"
              rel="noopener noreferrer"
            >
              [github]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="https://www.linkedin.com/in/armankumaraswamy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              [linkedin]
            </Link>
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/thoughts"
            >
              [thoughts]
            </Link>
            {/* <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/talk"
            >
              [leave an anonymous note]
            </Link> */}
          </div>
        </div>
        <div className="relative -left-5">
          <CLI />
        </div>
      </div>
      {/* <Link
        href="/gui"
        className="fixed bottom-0 right-0 mr-4 mb-4 hover:underline"
      >
        prefer a GUI?
      </Link> */}
    </div>
  );
}
