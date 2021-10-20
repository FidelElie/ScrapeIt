// ! Next and React
import { ReactNode } from "react";

// ! Library
import { joinClasses } from "../../lib/utils";

// ! Interfaces and Types
type ButtonProps = {
  onClick: Function,
  disabled?: boolean,
  alternate?: boolean,
  extendStyle?: string,
  children: ReactNode
}

type ToggleButtonProps = {
  toggles: {
    icon?: string,
    text: string,
    style?: string
  }[],
  containerStyle?: string,
  toggleState: any,
  tooltipsEnabled?: boolean,
  setToggleState: Function,
  noText?: boolean,
}

const Button = (props: ButtonProps) => {
  const { children, disabled, onClick, alternate, extendStyle } = props;

  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      className={joinClasses("w-auto px-3 py-2 text-base rounded-md text-white", {
        "bg-blue-600": !alternate,
        "bg-gray-500": alternate,
        [extendStyle]: extendStyle
      })}
    >
      { children }
    </button>
  )
}

const ToggleButtons = (props: ToggleButtonProps) => {
  const {
    containerStyle,
    toggles,
    toggleState,
    setToggleState,
    tooltipsEnabled,
    noText
  } = props;

  return (
    <div className={containerStyle}>
      {
        toggles.map(toggle => (
          <button
            className={joinClasses("flex items-center p-3 text-base focus:outline-none whitespace-nowrap", {
              "text-white bg-blue-600": toggleState == toggle.text,
              "text-gray-500 bg-gray-600": toggleState != toggle.text,
              [toggle.style]: toggle.style
            })}
            onClick={() => setToggleState(toggle.text)}
            data-tip={tooltipsEnabled ? toggle.text : null}
            data-for={tooltipsEnabled ? "base-tooltip" : null}
            key={toggle.text}
          >
            {
              toggle.icon &&
                <span className={joinClasses("text-2xl", {
                  "mr-2": !noText
                })}>
                  <i className={toggle.icon}/>
                </span>
            }
            { !noText && toggle.text }
          </button>
        ))
      }
    </div>
  )
}

export default Button;
export { ToggleButtons }
