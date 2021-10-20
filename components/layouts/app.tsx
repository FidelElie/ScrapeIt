// ! Next And React
import Head from "next/head";
import { ReactNode } from "react";

// ! Components
import Navbar from "../misc/navbar";

type ComponentProps = {
  title?: string,
  text?: string,
  children?: ReactNode,
  buttonOnClick?: Function,
  buttonText?: string
}

export default function AppLayout ( props : ComponentProps) {
  const { title, text, children } = props;

  return (
    <>
      <Head>
        { title && <title>{ title }</title> }
      </Head>
      <div className="bg-gray-700 h-screen w-screen flex flex-col">
        <Navbar text={text}/>
        <div className="flex-grow flex flex-col items-center justify-center overflow-y-auto">
          { children }
        </div>
      </div>
    </>
  )
}
