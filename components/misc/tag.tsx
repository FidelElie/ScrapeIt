import { joinClasses } from "../../lib/utils";

export default function Tag (props) {
  const { children, noDimensions, extendStyle } = props;

  return (
    <span className={joinClasses("rounded-full bg-blue-600 text-white flex items-center justify-center font-medium", {
      "w-8 h-8": !noDimensions,
      [extendStyle]: extendStyle
    })}>
      { children }
    </span>
  )
}
