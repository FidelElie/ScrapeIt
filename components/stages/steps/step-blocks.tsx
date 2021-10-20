// ! Library
import blocks from "../../../lib/content/blocks";
import { joinClasses } from "../../../lib/utils";

export default function StepBlocks(props) {
  const { steps } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="overflow-ellipsis whitespace-nowrap text-gray-500">
          Step Blocks
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {
          blocks.map(block => (
            <div
              className={joinClasses({
              "group cursor-pointer": !block.comingSoon
              })}
              id={block.text}
              key={block.text}
              draggable={!block.comingSoon}
              onDragStart={e => {
                e.dataTransfer.dropEffect = "copy";
                e.dataTransfer.setData("text/plain", (e.target as HTMLDivElement).id);
              }}
            >
              <div className="w-11/12 mx-auto box-border border flex py-4 px-4 items-center mb-3 group-hover:border-blue-600 relative overflow-hidden">
                { block.comingSoon && (
                    <div className="absolute left-0 top-0 w-full h-full bg-gray-600 bg-opacity-90 text-center flex items-center justify-center">
                        <span className="text-white tracking-tight uppercase select-none">
                          Coming Soon
                        </span>
                    </div>
                )}
                <div className="text-gray-400 text-3xl mr-5 group-hover:text-blue-600 transition-colors">
                  <i className={block.icon} />
                </div>
                <span className="tracking-tight flex-grow select-none">{block.text}</span>
                <div className="text-gray-600 hover:text-blue-600 select-none">
                  <i data-tip={block.tooltip} data-for="base-tooltip" className="fas fa-question-circle" />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
