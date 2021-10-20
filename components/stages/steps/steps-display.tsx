// ! Next And React
import { useEffect } from "react";


// ! Library
import { ApplicationState } from "../../../lib/app";
import { stepEntryType } from "../../../lib/types";

//! Components
import ReactTooltip from "react-tooltip";
import Button from "../../misc/buttons";
import Tag from "../../misc/tag";
import { Input } from "../../misc/forms";

export default function StepsDisplay () {
  const { steps, setState } = ApplicationState();

  const removeStep = (order: number) => {
    let presentSteps = [...steps];
    presentSteps.splice(order, 1);

    setState({ steps: presentSteps });
  }

  const changeStepParameter = (fieldMap: Object, index: number) => {
    let currentSteps = [...steps];

    const modifiedFields = { ...currentSteps[index].fields, ...fieldMap }

    currentSteps[index] = { ...currentSteps[index], ...{ fields: modifiedFields } }

    setState({ steps: currentSteps });
  }

  return (
    <>
      {
        steps.map((step: stepEntryType, index: number) =>
          <StepCard
            step={step}
            index={index}
            removeStep={removeStep}
            changeStepParameter={changeStepParameter}
            key={`${step}-${index}`}
          />
        )
      }
    </>
  )
}

const StepCard = (props) => {
  const { step, index, removeStep, changeStepParameter } = props;

  useEffect(() => { ReactTooltip.rebuild(); })

  return (
    <div
      className="w-11/12 mx-auto mb-3 px-4 py-3 border flex items-center"
      onDragOver={e => { e.preventDefault(); }}
      key={index}
    >
      <div className="flex items-center">
        <Tag extendStyle="mx-3">
          {index + 1}
        </Tag>
        <span className="text-gray-400 text-3xl" data-tip={step.type} data-for="base-tooltip">
          <i className={step.icon} />
        </span>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col flex-grow items-center mx-3">
          {
            Object.entries(step.params).map(param => {
              const [key, config] = param;

              return <Input
                {...config}
                extendStyle={Object.keys(step.params).length > 1 ? "mb-2" : "mb-0"}
                value={step.fields[key]}
                onChange={e => { changeStepParameter({ [key]: e.target.value }, index) }}
                key={`${index}-${key}`} />
            })
          }
        </div>
        <Button onClick={() => { removeStep(index) }}>
          <i className="fas fa-times" />
        </Button>
      </div>
    </div>
  )
}
