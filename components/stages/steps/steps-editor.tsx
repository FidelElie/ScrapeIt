// ! Next and React
import { useState } from "react";

// ! Library
import blocks from "../../../lib/content/blocks";
import { ApplicationState } from "../../../lib/app";
import { joinClasses } from "../../../lib/utils";
import { stepEntryType } from "../../../lib/types";

// ! Components
import StepsDisplay from "./steps-display";

export default function StepsEditor () {
  const { steps, setState } = ApplicationState();
  const [draggedOver, setDraggedOver] = useState(false);

  const addNewStep = (event) => {
    const blockId = event.dataTransfer.getData("text/plain");
    let presentSteps = [...steps];

    const correspondingBlockInfo = blocks.find(block => block.text == blockId);

    const stepEntry: stepEntryType = {
      type: correspondingBlockInfo.text,
      icon: correspondingBlockInfo.icon,
      params: correspondingBlockInfo.params,
      fields: Object.fromEntries(
        Object.keys(correspondingBlockInfo.params).map(key => [key, ""]))
      }

    presentSteps.push(stepEntry);
    setState({ steps: presentSteps });

    setDraggedOver(false);
    event.dataTransfer.clearData();
    event.preventDefault();
  }

  return (
    <div
      className={joinClasses("flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-3 border", {
        "border-transparent": !draggedOver,
        "border-blue-600": draggedOver && steps.length > 0
      })}
      onDragOver={e => {
        e.preventDefault();
        setDraggedOver(true);
      }}
      onDragLeave={ e => {
        e.preventDefault();
        setDraggedOver(false);
      }}
      onDrop={addNewStep}
    >
      {
        steps.length == 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className={joinClasses("border flex flex-col tracking-tight  items-center justify-center p-5 w-52 h-52 select-none", {
              "border-blue-600": draggedOver
            })}>
              Drop Your Steps Here
              <span className="text-2xl mt-1">
                <i className="fas fa-tint" />
              </span>
            </div>
          </div>
        ) : <StepsDisplay/>
      }
    </div>
  )
}
