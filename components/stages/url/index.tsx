// ! Next and React
import { useEffect, useRef, useState } from "react";

// ! Library
import { ApplicationState } from "../../../lib/app";

// ! Components
import { ToggleButtons } from "../../misc/buttons";
import GenericAddress from "./generic-bar";
import GoogleSearch from "./google-bar";

// TODO edit the layout

export default function UrlStage() {
  const { url, setState } = ApplicationState();
  const [barMode, setBarMode] = useState<"Generic" | "Google">("Generic");
  const [openURL, setOpenURL] = useState(false);
  const hiddenAnchorReference = useRef<HTMLAnchorElement>(null);

  const togglesArray = [
    { icon: "fas fa-address-book", text: "Generic" },
    { icon: "fab fa-google", text: "Google" }
  ]

  const openUrlAndNavigate = (protocol: string) => {
    let chosenUrl = url;
    if (!chosenUrl.includes("https://") && !chosenUrl.includes("http://")) {
      chosenUrl = `${protocol}${chosenUrl}`;
    }

    if (openURL) {
      hiddenAnchorReference.current.setAttribute("href", chosenUrl);
      hiddenAnchorReference.current.click();
    }

    setState({ url: chosenUrl, stage: "steps" });
  }

  useEffect(() => { setState({ url: "" }) }, [barMode]);

  return (
    <div className="flex flex-col h-full justify-center">
      <a
        className="hidden"
        target="_blank"
        rel="noopener noreferrer"
        ref={hiddenAnchorReference}
      />
      <ToggleButtons
        containerStyle="flex items-center justify-center w-min"
        toggles={togglesArray}
        toggleState={barMode}
        setToggleState={setBarMode}
      />
      <div className="bg-white p-5 transition-all">
        {barMode == "Generic" &&
          <GenericAddress
            choose={openUrlAndNavigate}
            openURL={openURL}
            setOpenURL={setOpenURL}
          />
        }
        {barMode == "Google" &&
          <GoogleSearch
            choose={openUrlAndNavigate}
            openURL={openURL}
            setOpenURL={setOpenURL}
          />
        }
      </div>
    </div>
  )
}
