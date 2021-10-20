// ! Components
import SummaryCard from "./card";

export default function CrawlerSummaryTab (props) {
  const { results, queue } = props;

  return (
    <div className="p-2 w-full">
      <div className="h-full w-full p-5 flex flex-col">
        <div className="w-full mt-2">
          <div className="text-gray-600">See How The Crawlers Did</div>
          <hr className="my-2" />
          <div className="">
            {
              results.map(crawlerResult =>
                <SummaryCard crawlerResult={crawlerResult} queue={queue} key={crawlerResult.id} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
