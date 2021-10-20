// ! Next And React
import { useEffect } from "react";

// ! Library
import { joinClasses } from "../../lib/utils";


const Input = (props) => {
  const { type, id, autoComplete, value, onChange, placeholder, screenReader, extendStyle, listId, listItems } = props;

  return (
    <>
      <label htmlFor={id} className={joinClasses({
        "sr-only": screenReader
      })}>{ id }</label>
      <input
        type={type}
        id={id}
        name={id}
        className={joinClasses("w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border-none rounded-lg bg-gray-200 focus:border-gray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2", {
          [extendStyle]: extendStyle
        })}
        placeholder={placeholder}
        autoComplete={autoComplete}
        list={listId}
        value={value}
        onChange={onChange}
      />
      {
        listId && (
          <datalist id={listId}>
            { listItems.map(item => <option value={item} key={`${listId}-${item}`}/>) }
          </datalist>
        )
      }
    </>
  )
}

const Checkbox = (props) => {
  const { label, checked, onChange, extendLabelStyle } = props;

  return (
    <label className={joinClasses("flex items-center", {
      [extendLabelStyle]: extendLabelStyle
    })}>
      <input type="checkbox" className="form-checkbox rounded-md ring-opacity-0 focus:ring-offset-0" checked={checked}
        onChange={onChange}
      />
      <span className="ml-1 text-gray-500 tracking-tight">{ label }</span>
    </label>
  )
}

export { Input, Checkbox }
