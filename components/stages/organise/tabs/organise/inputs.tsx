// ! Next and React
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { joinClasses, numberArray } from "../../../../../lib/utils";
import { Checkbox, Input } from "../../../../misc/forms";

const FieldOrderInput = (props) => {
  const { totalFields, index, fieldOrder, setFieldOrder } = props;
  const correspondingField = fieldOrder[index];

  const [order, setOrder] = useState(correspondingField[1]);

  const orderAlreadyOccupied = fieldOrder.map(x => x[1]).filter(x => x != 0);

  useEffect(() => {
    let orderToChange = [...fieldOrder];
    const fieldIndex = orderToChange.indexOf(correspondingField);
    orderToChange[fieldIndex][1] = order;
    setFieldOrder(orderToChange);
  }, [order])

  return (
    <div className="p-1 border-box">
      <div className="border p-3 flex w-min items-center rounded-md b">
        <span className="text-blue-600 mr-5 whitespace-nowrap"> { correspondingField[0] }</span>
        <select className="rounded-md border-none appearance-none w-20 focus:ring-none" value={order}
        onChange={(event) => {
          const orderValue = parseInt((event.target as HTMLSelectElement).value, 10);
          if (!orderAlreadyOccupied.includes(orderValue)) setOrder(orderValue)
        }}>
          {
            numberArray(totalFields + 1, 0)
              .map(x => (
                <option key={`${correspondingField[0]}-${x}`}>{x}</option>
              ))
          }
        </select>
      </div>
    </div>
  )
}

const FieldValueAssignInput = (props) => {
  const { content, newFieldContent, setNewFieldContent } = props;

  const [customValue, setCustomValue] = useState(false);

  const assignNewValue = (valueToAssign: string) => {
    let newFieldsToModify = [...newFieldContent]
    const newFieldIndex = newFieldContent.indexOf(content);

    const valuesToAssign = [content[0], valueToAssign, customValue];

    newFieldsToModify[newFieldIndex] = valuesToAssign;


    setNewFieldContent(newFieldsToModify);
  }

  const customValueChange = () => {
    customValue ? assignNewValue("") : assignNewValue("Url");
  }

  useEffect(() => { customValueChange(); }, []);

  useEffect(() => { customValueChange(); }, [customValue]);
  return (
    <div className="rounded-md flex items-center justify-between w-full mb-3">
      <span className="text-blue-600 whitespace-nowrap">{ content[0] }</span>
      {
        !customValue ? (
          <select className="rounded-md appearance-none w-full mx-5 border border-gray-200 focus:ring-none"
            value={content[1]}
            onChange={(event: ChangeEvent) => {
              assignNewValue((event.target as HTMLSelectElement).value)
            }}
          >
            <option>Url</option>
          </select>
        ) : (
          <Input
            id={`input-name-${content[0]}`}
            type="text"
            placeholder="Field Recurring Data"
            value={content[1]}
            onChange={(event: ChangeEvent) =>
              assignNewValue((event.target as HTMLInputElement).value)}
            extendStyle="mx-2"
            screenReader
          />
        )
      }
      <Checkbox
        label="Custom"
        checked={customValue}
        onChange={() => setCustomValue(!customValue)}
      />
    </div>
  )
}



export { FieldOrderInput, FieldValueAssignInput };
