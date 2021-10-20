// ! Next and React
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { modifyObjectValue } from "../../../../../lib/utils";
import { exportInformation } from "../../../../../lib/functions";

// ! Components
import Button from "../../../../misc/buttons";
import { Checkbox, Input } from "../../../../misc/forms";

// ! Variables
const exportErrorMessages = {
  noFileFormats: "At Least One File Format Needs To Be Selected",
  noFileName: "No File Name Has Been Chosen",
  noFieldsAssigned: "No Fields Have Been Assigned (Check Organise Tab)"
}

export default function ExportInfoTab (props) {
  const {
    results,
    url,
    fieldOrder,
    exportInfo,
    setExportInfo,
    exportFormats,
    setExportFormats,
    exportOptions,
    setExportOptions,
    exportErrors,
    setExportErrors
  } = props;

  const determineErrors = () => {
    setExportErrors({
      noFileFormats: !Object.values(exportFormats).includes(true),
      noFileName: exportInfo.name == "",
      noFieldsAssigned: fieldOrder.map(x => x[1]).filter(x => x != 0).length == 0
    })
  }

  const changeName = (value: string) => {
    let infoToModify = Object.assign({}, exportInfo);
    infoToModify.name = value;
    setExportInfo(infoToModify);
  }

  // TODO figure out how to fix this bullshit
  const convertFileName = () => {
    !exportInfo.fieldUsed ? changeName("") : changeName(fieldOrder[0][0]);
  };

  const exportData = async () => {
    const fields = {url: url}
    const exp = { info: exportInfo, formats: exportFormats, options: exportOptions }

    const asyncExport = await exportInformation(results, fieldOrder, exp, fields);
  }

  useEffect(() => {determineErrors();}, []);

  useEffect(() => {
    // convertFileName();
    determineErrors();
  }, [exportInfo.fieldUsed]);

  useEffect(() => {
    determineErrors();
  }, [fieldOrder, exportInfo, exportFormats]);

  return (
    <div className="p-2 w-full">
      <div className="h-full w-full p-5 flex w-full flex-col">
        <div className="w-full mt-2">
          <div className="mb-5">
            <div className="text-gray-600">Choose Desired File Name</div>
            <hr className="my-2" />
            <div className="text-gray-600 flex flex-grow">
              {
                !exportInfo.fieldUsed ? (
                  <Input
                    type="text"
                    id="filename"
                    placeholder="File Name"
                    value={exportInfo.name}
                    onChange={(e: ChangeEvent) => {
                      changeName((e.target as HTMLInputElement).value)
                    }}
                    extendStyle="mb-0"
                    screenReader
                  />
                ) : (
                  <select
                    className="rounded-md border-none appearance-none w-full focus:ring-none"
                    placeholder="Field Name"
                    value={exportInfo.name}
                    onChange={(e: ChangeEvent) => {
                      changeName((e.target as HTMLSelectElement).value)
                    }}
                  >
                    {fieldOrder.map(field => <option key={field[0]}>{field[0]}</option>)}
                  </select>
                )
              }
              <Checkbox
                checked={exportInfo.fieldUsed}
                onChange={() => setExportInfo(modifyObjectValue("fieldUsed", exportInfo))}
                label="Use Field Name"
                extendLabelStyle="ml-3 whitespace-nowrap"
              />
            </div>
            {
              exportInfo.fieldUsed && (
                <div className="text-gray-500 mt-3">
                  <i className="fas fa-question-circle mr-3" />
                  <span>
                    File Name Will Be Generated From Given Field Value (1st Result Value Will Be Used)
                  </span>
                </div>
              )
            }
          </div>
          <div className="mb-5">
            <div className="text-gray-600">Choose Desired File Formats</div>
            <hr className="my-2" />
            <div className="flex">
              <Checkbox
                checked={exportFormats.exportToCSV}
                onChange={() => setExportFormats(
                  modifyObjectValue("exportToCSV", exportFormats)
                )}
                label="Comma Separated Values (CSV)"
                extendLabelStyle="mr-4"
              />
              <Checkbox
                checked={exportFormats.exportToJSON}
                onChange={() => setExportFormats(
                  modifyObjectValue("exportToJSON", exportFormats)
                )}
                label="Javascript Object Notation (JSON)"
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="text-gray-600">Options</div>
            <hr className="my-2" />
            <div className="flex flex-col">
              <div className="flex flex-col mb-5">
                <Checkbox
                  checked={exportOptions.exportHumanReadable}
                  onChange={() => setExportOptions(
                    modifyObjectValue("exportHumanReadable", exportOptions)
                  )}
                  label="Use Human Readable Fields"
                />
                <div className="text-gray-500 ml-5">
                  <i className="fas fa-question-circle mr-3" />
                  <span>
                    Convert All Field Names To Be More Human Readable Field (e.g my-field -&gt; My Field)
                  </span>
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <Checkbox
                  checked={exportOptions.exportUsingZip}
                  onChange={() => setExportOptions(
                    modifyObjectValue("exportUsingZip", exportOptions)
                  )}
                  label="Export To Zip File"
                />
                <div className="text-gray-500 ml-5">
                  <i className="fas fa-question-circle mr-3" />
                  <span>
                    All Files Will Be Bundled In A Zip File Of The Same Name
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <Checkbox
                  checked={exportOptions.occupyEmptyEntries}
                  onChange={() => setExportOptions(
                    modifyObjectValue("occupyEmptyEntries", exportOptions))
                  }
                  label="Occupy Empty Entries"
                />
                <div className="text-gray-500 ml-5">
                  <i className="fas fa-question-circle mr-3" />
                  <span>
                    Occupy All Empty Entries With A Null Value (This Includes Custom Fields)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="text-gray-600">Export Checklist</div>
            <hr className="my-2" />
            {
              !Object.values(exportErrors).includes(true) ? (
                <span className="text-blue-600">
                  You're Good To Go :)
                </span>
              ) : (
                <>
                  {
                    Object.entries(exportErrors).map((error, index) => {
                    const [errorKey, errorBoolean] = error;

                    if (errorBoolean) return (
                      <span className="block text-gray-800 mb-2" key={`export-error-${index}`}>
                        { exportErrorMessages[errorKey]}
                      </span>
                    )
                  })
                  }
                </>
              )
            }
          </div>
          <div className="mb-5 flex justify-end w-full">
            <Button
              onClick={exportData}
              disabled={Object.values(exportErrors).includes(true)}
              extendStyle="disabled:opacity-50"
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
