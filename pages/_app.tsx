// ! Next And React
import { AppProps } from "next/app";
import { useEffect, useState } from "react";

// ! Styles
import 'tailwindcss/tailwind.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

// ! Components
import ReactTooltip from "react-tooltip";

// ! Providers
import ApplicationProvider from "../lib/app";

export default function App({ Component, pageProps }: AppProps) {
  const [renderTooltips, setRenderTooltips] = useState(false);

  useEffect(() => {setRenderTooltips(true);}, []);

  return (
    <ApplicationProvider>
      { renderTooltips && <ReactTooltip id="base-tooltip"/> }
      <Component { ...pageProps } />
    </ApplicationProvider>
  )
}
