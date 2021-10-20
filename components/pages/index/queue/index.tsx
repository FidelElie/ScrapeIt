// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import { ApplicationState } from "../../../../lib/app";
import { modeOptions } from "../../../../lib/content";

// ! Components
import QueueModal from "./modals/queue";
import HtmlModal from "./modals/html";
import CrawlerCard from "./card";
import Button, { ToggleButtons } from "../../../misc/buttons";

// ! Types And Interfaces
type crawlerModes = "selection" | "general" | "specific" | "recurring";
type crawlerQueueType = {
  id: string,
  field: string,
  type: string,
  selector: string
}[];


export default function Queue() {
  const { steps, preview, baseHTML, url, setState } = ApplicationState();

  const [loading, setLoading] = useState(true);

  const mapWebsite = async () => {
    const request = await fetch("/api/map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({url: url})
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
      {/* <QueueModal {...queueModalProps}/>
      <HtmlModal
        html={html}
        htmlModal={htmlModal}
        openHtmlModal={openHtmlModal}
      /> */}
      <div className="flex w-full h-full">
        <div className="h-full w-1/2 p-2">
          <div className="h-full w-full rounded-md bg-white p-5 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="overflow-ellipsis whitespace-nowrap text-gray-500">
                {url}
              </div>
              <a className="p-2 h-8 h-8 bg-blue-600 text-white rounded-md flex justify-center items-center" href={url} target="__blank">
                <i className="fas fa-external-link-alt"/>
              </a>
            </div>
            <hr className="my-2" />
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {
                !loading && preview && (
                  <img className="w-full h-auto" src={`data:image/png;base64, ${preview}`} />
                )
              }
              {
                loading && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span className="text-blue-600 mb-5 text-6xl">
                      <i className="fas fa-circle-notch fa-spin" />
                    </span>
                    <span className="text-gray-500">Loading Website Preview</span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="h-full flex-grow p-2">
          <div className="h-full w-full rounded-md bg-white p-5 flex flex-col">
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            </div>
            <hr className="my-2" />
            <div className="w-full flex justify-between items-center">
              <span className="text-gray-600">Crawlers</span>
              <div className="flex items-center justify-end">
                {/* <Button onClick={() => setQueue([])} extendStyle="rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 focus:outline-none" disabled={queue.length == 0}>
                  <i className="fas fa-redo-alt"/>
                </Button>
                <Button onClick={() => openHtmlModal(true)} extendStyle="rounded-full w-10 h-10 ml-2 flex items-center justify-center disabled:opacity-50 focus:outline-none" disabled={html == ""}>
                  <i className="fas fa-code" />
                </Button> */}
              </div>
              <Button onClick={() => setState({ stage: "crawl"})} extendStyle="rounded-full w-10 h-10 disabled:opacity-50">
                <i className="fas fa-check"/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
