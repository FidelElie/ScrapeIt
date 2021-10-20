// ! Next and React
import { useEffect, useState } from "react";

// ! Components
import Button, { ToggleButtons } from "../../../misc/buttons";
import CrawlerSummaryTab from "../../../stages/organise/tabs/summary";
import OrganiseFieldsTab from "../../../stages/organise/tabs/organise";
import ExportInfoTab from "../../../stages/organise/tabs/info";

// ! Variables
const infoMap = { name: "", fieldUsed: false }
const formatsToggleMap = { exportToCSV: true, exportToJSON: false };
const optionsToggleMap = {
  exportHumanReadable: false,
  exportUsingZip: false,
  occupyEmptyEntries: false
}
const errorsMap = { noFileFormats: false, noFileName: false, noFieldsAssigned: false }

export default function Export(props) {
  const { queue, results, url, setStage } = props;

  const [exportMode, setExportMode] = useState("Summary");
  const [fieldOrder, setFieldOrder] = useState([]);
  const [newFieldContent, setNewFieldContent] = useState([]);

  const [exportInfo, setExportInfo] = useState<any>(infoMap);
  const [exportFormats, setExportFormats] = useState<any>(formatsToggleMap);
  const [exportOptions, setExportOptions] = useState<any>(optionsToggleMap);
  const [exportErrors, setExportErrors] = useState<any>(errorsMap);

  const togglesArray = [
    { icon: "fas fa-clipboard", text: "Summary", style: "rounded-tl-md"},
    { icon: "fas fa-columns", text: "Organise"},
    { icon: "fas fa-file-export", text: "Export", style:"rounded-tr-md"}
  ]

  const summaryProps = { results, queue };
  const fieldsProps = { fieldOrder, setFieldOrder, newFieldContent, setNewFieldContent };
  const infoProps = { results, url, fieldOrder, exportInfo, setExportInfo, exportFormats, setExportFormats, exportOptions, setExportOptions, exportErrors, setExportErrors
  };

  useEffect(() => {
    const allCrawlerResults = results.map(crawler => crawler.results).flat();
    const fields = allCrawlerResults.map(result => Object.keys(result.map)).flat();
    const uniqueFields = Array.from(new Set(fields));
    const fieldWithOrder = uniqueFields.map(field => [field, 0, false]);

    setFieldOrder(fieldWithOrder);
  }, []);

  useEffect(() => {
    const customFields = fieldOrder.filter(x => x[2]).map(x => [x[0], "", false]);
    setNewFieldContent(customFields)
  }, [fieldOrder])

  return (
    <div className="flex flex-col w-full h-full">
      <a className="hidden" id="download-link"/>
      <div className="px-5 py-2 w-full text-gray-600 rounded-md bg-white mb-5 flex justify-between items-center">
        {url}
        <Button onClick={() => setStage("queue")} alternate>
          Back To Queue
        </Button>
      </div>
      <div className="w-full">
      </div>
      <ToggleButtons
        containerStyle="flex items-center justify-center rounded-tl-md rounded-tr-md w-min"
        toggles={togglesArray}
        toggleState={exportMode}
        setToggleState={setExportMode}
      />
      <div className="rounded-b-md rounded-tr-md bg-white p-5 transition-all h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        { exportMode == "Summary" && <CrawlerSummaryTab {...summaryProps}/> }
        { exportMode == "Organise" && <OrganiseFieldsTab {...fieldsProps}/> }
        { exportMode == "Export" && <ExportInfoTab {...infoProps}/> }
      </div>
    </div>
  )
}
