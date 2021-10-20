// ! Next and React
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { modeOptions } from "../../../../../lib/content";

// ! Components
import ModalContainer from "../../../../misc/modals";
import Button from "../../../../misc/buttons";
import { Checkbox, Input } from "../../../../misc/forms";
import Tag from "../../../../misc/tag";

export default function QueueModal(props) {
  const {
    queue,
    setQueue,
    crawlerQueue,
    setCrawlerQueue,
    crawlerMode,
    setCrawlerMode,
    queueModal,
    openQueueModal,
    selectedCrawler,
    setSelectedCrawler,
  } = props;

  const [baseSelector, setBaseSelector] = useState("");

  const closeModal = () => {
    openQueueModal(false);
    setCrawlerMode("selection");
    setSelectedCrawler(null);
    setCrawlerQueue([]);
  };

  const commitToMainQueue = (mode: string, baseSelector: string | null) => {
    let mainQueueToModify = queue;

    if (selectedCrawler) {
      const existingCrawler = mainQueueToModify.find(
        crawler => crawler.id == selectedCrawler);
      const correspondingIndex = mainQueueToModify.indexOf(existingCrawler);
      mainQueueToModify[correspondingIndex] = {
        id: selectedCrawler, mode: mode, baseSelector: baseSelector, steps: crawlerQueue
      }
    } else {
      const crawlerId = (mainQueueToModify.length + 1).toString()
      mainQueueToModify.push({
        id: crawlerId, mode: mode, baseSelector: baseSelector, steps: crawlerQueue
      });
    }

    setQueue(mainQueueToModify);
    setSelectedCrawler(null);
    setCrawlerQueue([]);
    closeModal();
  }

  useEffect(() => {
    const correspondingCrawler = queue.find(crawler => crawler.id == selectedCrawler);
    if (correspondingCrawler) {
      setBaseSelector(correspondingCrawler.baseSelector);
    }
  }, [selectedCrawler]);

  const selectionProps = { setCrawlerMode, closeModal }
  const recurringProps = { crawlerQueue, setCrawlerQueue, closeModal, commitToMainQueue, baseSelector, setBaseSelector }

  return (
    <ModalContainer
      isOpen={queueModal}
      onClose={closeModal}
      contentClassName={crawlerMode == "selection" ? "max-w-md" : "max-w-3xl"}
      disableOverlayClick
    >
      { crawlerMode == "selection" && <SelectionMode {...selectionProps} /> }
      { crawlerMode == "recurring" && <RecurringMode {...recurringProps} /> }
    </ModalContainer>
  )
}

const SelectionMode = (props) => {
  const { setCrawlerMode, closeModal } = props;

  return (
    <>
      <div className="mb-5">
        <span className="text-gray-500">Choose You Auxillary Crawler Mode</span>
      </div>
      {
        Object.entries(modeOptions).filter(x => x[0] != "recurring").map(option => (
          <div className="group" onClick={() => setCrawlerMode(option[0])} key={option[0]}>
            <div className="flex items-center mb-5 rounded-md border p-5 group-hover:bg-blue-600 group-hover:cursor-pointer">
              <div className="mr-5 text-3xl text-blue-600 group-hover:text-white">
                <i className={option[1].icon} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl group-hover:text-white">
                  {option[1].title}
                </span>
                <hr className="my-1" />
                <span className="text-sm text-gray-500 group-hover:text-gray-200">
                  {option[1].description}
                </span>
              </div>
            </div>
          </div>
        ))
      }
      <div className="flex justify-end">
        <Button onClick={closeModal} alternate>
          Cancel
        </Button>
      </div>
    </>
  )
}

const GeneralMode = (props) => {
  const { crawlerQueue, setCrawlerQueue, setCrawlerMode, closeModal } = props;
}

const SpecificMode = (props) => {
  const { crawlerQueue, setCrawlerQueue, setCrawlerMode, closeModal } = props;
}

const RecurringMode = (props) => {
  const {
    crawlerQueue,
    setCrawlerQueue,
    closeModal,
    commitToMainQueue,
    baseSelector,
    setBaseSelector
  } = props;

  const [field, setField] = useState("");
  const [type, setType] = useState("");
  const [selector, setSelector] = useState("");
  const [subQueue, setSubQueue] = useState(false);

  const currentUniqueIds = crawlerQueue
    .map(crawler => crawler.id)
    .filter(id => !id.includes("."))
    .map(id => parseInt(id, 10));

  const currentHighestId = (() => {
    if (currentUniqueIds.length == 0) {
      return 0
    }
    return Math.max(...currentUniqueIds);
  })()

  const findSubPoint = (idPrefix: string) => {
    const correspondingSubQueue = crawlerQueue.filter(
      queue => queue.id.includes(idPrefix) && queue.id.includes("."));

    return correspondingSubQueue.map(
      queue => parseInt(queue.id.split(".")[1], 10));
  }

  const addPointToQueue = () => {
    let pointId: string;
    let queueToModify = crawlerQueue;
    const queueLength = queueToModify.length;

    if (subQueue) {
      const subQueueIds = findSubPoint(queueLength);

      const newIdSuffix = subQueueIds.length == 0 ? 1 : Math.max(subQueueIds) + 1

      pointId = `${queueLength}.${newIdSuffix}`;
    } else {
      pointId = `${currentHighestId + 1}`;
    }

    const point = { id: pointId, field: field, type: type, selector: selector }

    queueToModify.push(point);
    setCrawlerQueue(queueToModify);
    setField("");
    setType("");
    setSelector("");
  }

  const removePointFromQueue = (id: string) => {
    let queueToModify = [...crawlerQueue];

    if (!id.includes(".")) {
      queueToModify = queueToModify.filter(point => point.id.split(".")[0] != id);
    } else {
      queueToModify = queueToModify.filter(point => point.id != id);
    }

    setCrawlerQueue(queueToModify);
  }

  useEffect(() => {
    if (crawlerQueue.length == 0) {
      setSubQueue(false);
    }
  }, [crawlerQueue])

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-5">
        <i className={`${modeOptions["recurring"].icon} text-2xl mr-1`}/>
        Main Crawler
      </div>
      <div className="w-full flex items-center justify-between">
        <Input
          type="text"
          id="base-selector"
          placeholder="Base Selector"
          extendStyle="mb-0 mr-3"
          value={baseSelector}
          onChange={(e: ChangeEvent) => setBaseSelector((e.target as HTMLInputElement).value)}
          screenReader
        />
        <i className="far fa-question-circle text-xl"/>
      </div>
      <hr className="my-2"/>
      <div className="h-96 mb-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex flex-col items-center">
        {
          crawlerQueue.length == 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Add A Step Below
            </div>
          ) : (
            crawlerQueue.map(queue => (
              <div className="w-11/12 flex items-center justify-between mb-3 border rounded-md p-2" key={queue.id}>
                <div className="flex items-center">
                  <Tag extendStyle="mr-3">{queue.id}</Tag>
                  <div className="flex flex-col">
                    <span>Field: {queue.field}</span>
                    <span>Type: {queue.type}</span>
                    <span>Selector: {queue.selector == "" ? "Parent Element" : queue.selector}
                    </span>
                  </div>
                </div>
                <Button onClick={() => removePointFromQueue(queue.id)} extendStyle="w-auto" alternate>
                  <i className="fas fa-times"/>
                </Button>
              </div>
            ))
          )
        }
      </div>
      <hr className="my-2 w-full"/>
      <div className="flex items-start justify-center flex-col">
        <div className="flex justify-between w-full">
          <Tag extendStyle="p-2" noDimensions>
            Step {subQueue ? `${currentHighestId}.${findSubPoint(currentHighestId.toString()) + 1}` : currentHighestId + 1}
          </Tag>
          <Checkbox checked={subQueue} onChange={() => setSubQueue(!subQueue)} extendLabelStyle="whitespace-nowrap" label="Sub Queue" />
        </div>
        <hr className="my-2"/>
        <div className="flex items-center w-full mb-3">
          <Input
            type="text"
            id="field"
            placeholder="Field"
            value={field}
            onChange={(e: ChangeEvent) => setField(
              (e.target as HTMLInputElement).value.split(" ").join("-").toLowerCase())
            }
            extendStyle="mr-3"
            screenReader
          />
          <Input
            type="text"
            id="type"
            placeholder="Type"
            list="types"
            value={type}
            onChange={(e: ChangeEvent) => setType((e.target as HTMLInputElement).value)}
            screenReader
          />
          <datalist id="types">
            <option value="innerText"/>
            <option value="textContent"/>
            <option value="innerHTML"/>
            <option value="href"/>
            <option value="id"/>
          </datalist>
        </div>
        <Input
          type="text"
          id="selector"
          placeholder="Selector"
          value={selector}
          onChange={(e: ChangeEvent) => setSelector((e.target as HTMLInputElement).value)}
          extendStyle="mb-5 mr-3"
          screenReader
        />
        <Button onClick={addPointToQueue}>
          Add Step
        </Button>
      </div>
      <hr className="my-2"/>
      <div className="flex justify-end">
        <Button onClick={() => commitToMainQueue("recurring", baseSelector)} extendStyle="disabled:opacity-50" disabled={crawlerQueue.length == 0}>
          Commit To Queue
        </Button>
        <Button onClick={closeModal} extendStyle="ml-2" alternate>
          Cancel
        </Button>
      </div>
    </div>
  )
}


