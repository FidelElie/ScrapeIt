// ! Next And React
import Link from "next/link";

// ! Library
import { ApplicationState, initialAppState } from "../../lib/app";

// ! Components
import Button from "./buttons";

const conditionalRoutes = ["steps", "crawl", "results"];

export default function Navbar (props: {text? : string}) {
  const { text } = props;
  const { stage, setState } = ApplicationState();

  const onConditionalRoute = conditionalRoutes.includes(stage);

  const startOver = () => { setState(initialAppState); }

  return (
    <>
      <div className="items-center w-full">
        <div className="text-gray-700 transition duration-500 ease-in-out transform bg-white">
          <div className="flex flex-col flex-wrap py-1 px-3 mx-auto md:items-center md:flex-row justify-between">
            <Link href="/">
              <a className="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
                <div className="inline-flex items-center">
                  <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600">
                  </div>
                  <h2 className="block p-2 text-xl tracking-tighter text-gray-500 transition duration-500 ease-in-out transform cursor-pointer hover:text-gray-500 lg:text-x lg:mr-8">{ text }</h2>
                </div>
              </a>
            </Link>
            { onConditionalRoute && <Button onClick={startOver}>Start Over</Button> }
          </div>
        </div>
      </div>

    </>
  )
}
