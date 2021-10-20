// ! Next adn React
import { useState } from "react";

// ! Library
import { modeOptions } from "../../../../lib/content";
import { makeStringTitle } from "../../../../lib/utils";

// ! Components
import Button from "../../../misc/buttons";
import Tag from "../../../misc/tag";

export default function CrawlerCard(props) {
  const {crawler, removeQueueEntry, editCrawlerCreation } = props;

  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="flex flex-col mb-5 rounded-md border p-5 group-hover:bg-blue-600 group-hover:cursor-pointer">
      <div className="flex justify-between w-full items-center">
        <div className="text-3xl text-blue-600 flex items-center group-hover:text-white">
          <i className={modeOptions.recurring.icon} />
          <div className="ml-3 text-base text-gray-500">
            { makeStringTitle(crawler.mode)} Crawler
          </div>
        </div>
        <div className="flex items-center">
          <Button onClick={() => {
            editCrawlerCreation(crawler.steps, crawler.mode, crawler.id)
           }} extendStyle="mr-2">
            <i className="far fa-edit" />
          </Button>
          <Button onClick={() => { removeQueueEntry(crawler.id) }}>
            <i className="fas fa-times" />
          </Button>
        </div>
      </div>
      <hr className="my-3 w-full" />
      <div className="text-gray-600 mb-3">
        Base Selector: {
          crawler.baseSelector == "" ? "Not Applicable" : crawler.baseSelector
        }
      </div>
      <Button onClick={() => setShowSteps(!showSteps)} extendStyle="mb-3">
        {crawler.steps.length} Total Steps
        <i className="fas fa-chevron-down ml-4" />
      </Button>
      <div className="flex flex-col w-full">
        {
          showSteps &&
            crawler.steps.map(step => (
              <div className="border flex p-2 rounded-md w-full mb-2" key={`${crawler.id}${step.id}`}>
                <Tag>{step.id}</Tag>
                <div className="ml-3 flex flex-col">
                  <span>Field: {step.field}</span>
                  <span>Type: {step.type}</span>
                  <span>Selector: {
                    step.selector == "" ? "Parent Element" : step.selector
                  }
                  </span>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )


}
