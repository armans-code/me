import Link from "next/link";
import CLI from "../../components/cli";

export default function Home() {
  return (
    <div className="text-gray-300 p-4 w-full flex justify-center">
      <div>
        <div className="mb-4 mt-16 flex flex-col gap-4">
          <div>
            <p>Arman Kumaraswamy</p>
            <p className="text-gray-400 text-sm">San Francisco, CA</p>
          </div>
          <p>&gt; hi!</p>
          <p>
            &gt; my name is arman, i'm studying computer science and mathematics
            at the university of florida
          </p>
          <p>
            &gt; i like full-stack web dev, typescript, and agentic workflows
          </p>
          <p>
            &gt; i'm a big believer in authentic, compounding relationships.
            feel free to reach out to me!
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
            {/* <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/talk"
            >
              [leave an anonymous note]
            </Link> */}
            <Link
              className="hover:font-bold hover:underline underline-offset-4"
              href="/thoughts"
            >
              [thoughts]
            </Link>
          </div>
        </div>
        <CLI />
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
