// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import { joinClasses } from "../../../../../lib/utils";

// ! Components
import Button from "../../../../misc/buttons";
import Tag from "../../../../misc/tag";

const SummaryCard = (props) => {
  const { crawlerResult, queue } = props;

  const [resultsCollapsed, setResultsCollapsed] = useState(true);

  const correspondingQueue = queue.find(x => x.id == crawlerResult.id);

  return (
   <div></div>
  )
}

const ResultsCard = (props) => {
  const { id, result, index, queue } = props;

  const [stepsCollapsed, setStepsCollapsed] = useState(true);

  const baseId = `${id}${index}`

  return (
    <div className="flex flex-col mb-1">
      <div className="flex border p-2 rounded-md items-end justify-between">
        <div className="flex items-center mr-5">
          <Tag extendStyle="flex-shrink-0">{ index + 1 }</Tag>
          <div className="ml-4 flex flex-col">
            {
              Object.entries(result.map).map(entries => {
                const [field, value] = entries;

                return (
                  <div className="overflow-ellipsis overflow-hidden" key={`${baseId}${field}`}>
                    <span className="font-medium">{ field }:</span>
                    <span className="text-gray-500"> { value }</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Button
          onClick={() => setStepsCollapsed(!stepsCollapsed)}
          extendStyle="whitespace-nowrap"
        ><i className="mr-2 fas fa-chevron-down"/> Steps</Button>
      </div>
      {
        !stepsCollapsed && (
          <div className="ml-10 mt-5">
            {
              result.statuses.map(step =>
                <StepCard {...step} queue={queue} baseId={baseId} key={`${baseId}${step.id}`}/>
              )
            }
          </div>
        )
      }
    </div>
  )
}

const StepCard = (props) => {
  const { id, status, queue, baseId } = props;

  const correspondingStep = queue.steps.find(x => x.id == id);

  return (
    <div className="flex flex-col mb-1">
      <div className="flex border p-2 rounded-md">
        <div className="flex flex-grow items-center justify-between mr-5">
          <Tag>{ id }</Tag>
          <div className="ml-4 flex flex-col flex-grow">
            <span>
              <span className="font-medium">Field:</span>
              <span className="text-gray-500"> {correspondingStep.field != "" ? correspondingStep.field : "No Field Allocated"}</span>
            </span>
            <span>
              <span className="font-medium">Type:</span>
              <span className="text-gray-500"> {correspondingStep.type}</span>
            </span>
            <span>
              <span className="font-medium">Selector:</span>
              <span className="text-gray-500"> {correspondingStep.selector != "" ? correspondingStep.selector : "Parent Element"}</span>
            </span>
          </div>
          <span className="">{ status }</span>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard;
