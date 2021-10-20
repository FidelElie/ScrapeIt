// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import { ApplicationState } from "../../../lib/app";
import { joinClasses } from "../../../lib/utils";

// ! Components
import StepBlocks from "./step-blocks";
import StepsEditor from "./steps-editor";
import WebsitePreview from "./website-preview";
import Button, { ToggleButtons } from "../../misc/buttons";

// ! Types, Interfaces And Variables
type modeTypes = "Step Blocks" | "Website Preview"
const toggleButtonStyles = "w-full"

export default function StepsStage() {
  const { steps, preview, url, setState } = ApplicationState();
  const [rightMode, setRightMode] = useState<modeTypes>("Step Blocks");
  const [loading, setLoading] = useState(true);


  const togglesArray = [
    { icon: "fas fa-cubes", text: "Step Blocks", style: toggleButtonStyles},
    { icon: "fas fa-image", text: "Website Preview", style: toggleButtonStyles},
  ]

  const mapWebsite = async () => {
    const request = await fetch("/api/map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url })
    });
    const response = await request.json();

    setState({ preview: response.preview, baseHTML: response.html });
    setLoading(false);
  }

  useEffect(() => {
    !preview ? mapWebsite() : setLoading(false);
  }, []);

  return (
    <>
      <div className="flex h-full">
        <div className={joinClasses("flex items-start h-full p-2 transition-all", {
          "w-1/2": rightMode == "Website Preview",
          "w-1/3": rightMode == "Step Blocks"
        })} style={{ transition: "width 1s"}}>
          <ToggleButtons
            containerStyle="flex flex-col items-center justify-center w-min"
            toggles={togglesArray}
            toggleState={rightMode}
            setToggleState={setRightMode}
            tooltipsEnabled
            noText
          />
          <div className="w-full h-full shadow-lg">
            <div className="h-full w-full bg-white p-5 flex flex-col">
              {
                rightMode == "Website Preview" &&
                  <WebsitePreview preview={preview} url={url} loading={loading}/>
              }
              {
                rightMode == "Step Blocks" &&
                  <StepBlocks steps={steps}/>
              }
            </div>
          </div>
        </div>
        <div className="h-full flex-grow p-2">
          <div className="h-full w-full bg-white p-5 flex flex-col">
            <StepsEditor/>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center justify-end">
              </div>
              <Button onClick={() => setState({ stage: "crawl" })} extendStyle=" disabled:opacity-50" disabled={steps.length == 0}>
                Crawl Steps
                <i className="ml-3 fas fa-chevron-right"/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
