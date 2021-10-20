// ! Next and React
import { ChangeEvent, useState } from "react";

// ! Components
import Button from "../../../../misc/buttons";
import { FieldOrderInput, FieldValueAssignInput } from "./inputs";
import { Input } from "../../../../misc/forms";

export default function OrganiseFieldsTab (props) {
  const { fieldOrder, setFieldOrder, newFieldContent, setNewFieldContent } = props;

  const [newFieldName, setNewFieldName] = useState("");

  const addNewField = () => {
    let fieldOrderToModify = [...fieldOrder];

    fieldOrderToModify.push([newFieldName, 0, true]);

    setFieldOrder(fieldOrderToModify);
    setNewFieldName("");
  }

  return (
    <div className="p-2 w-full">
      <div className="w-full flex flex-col h-full p-5">
        <div className="w-full mt-2 mb-5">
          <div className="text-gray-600">
            Choose The Order For Your Data - <span className="font-medium">Fields With Order 0 Will Not Be Included</span>
          </div>
          <hr className="my-2" />
          <div className="flex flex-wrap">
            {
              fieldOrder.map((field, index) => (
                <FieldOrderInput
                  totalFields={fieldOrder.length}
                  index={index}
                  fieldOrder={fieldOrder}
                  setFieldOrder={setFieldOrder}
                  key={field[0]}
                />
              ))
            }
          </div>
        </div>
        <div className="w-full mt-2 mb-5">
          <div className="text-gray-600">
            Add Blank Fields That You Want In The Data And Order Them Above.
            </div>
          <hr className="my-2" />
          <div className="flex items-center mt-4">
            <Input
              id="new-field"
              type="text"
              placeholder="New Field Name"
              value={newFieldName}
              onChange={(event: ChangeEvent) => {
                setNewFieldName((event.target as HTMLInputElement).value.split(" ").join("-").toLowerCase())
              }}
              screenReader
            />
            <Button onClick={addNewField} extendStyle="whitespace-nowrap ml-3">
              Add Above
            </Button>
          </div>
        </div>
        <div className="w-full mt-2 mb-5">
          <div className="text-gray-600">
            Assign Reoccurring Data To New Custom Fields
            </div>
          <hr className="my-2" />
          <div className="flex flex-col items-center mt-4">
            {newFieldContent.length == 0 && (
              <span className="mt-5 text-gray-600">
                No Custom Fields Are Present
              </span>
            )}
            {
              newFieldContent.map(content => <FieldValueAssignInput content={content} newFieldContent={newFieldContent} setNewFieldContent={setNewFieldContent} key={`Custom-Field-${content[0]}`} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
