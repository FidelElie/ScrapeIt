// ! Library
import { ApplicationState } from "../lib/app";

// ! Components
import AppLayout from "../components/layouts/app";

// ! Stages
import UrlStage from "../components/stages/url";
import StepsStage from "../components/stages/steps";
import CrawlStage from "../components/stages/crawl";
import OrganiseStage from "../components/stages/organise";

export default function Home() {
  const { stage } = ApplicationState();

  const stageMap = {
    url: { Component: UrlStage, text: "Stage 1: Choose The Website" },
    steps: { Component: StepsStage, text: "Stage 2: Add The Crawler Steps" },
    crawl: { Component: CrawlStage, text: "Stage 3: Crawl The Website" },
    organise: { Component: OrganiseStage, text: "Stage 4: Organise And Export" }
  }

  const CurrentStage = stageMap[stage].Component;

  return (
    <AppLayout
      title="Scraper | Web Scraping Made Easy"
      text={stageMap[stage].text}
    >
      <div className="container h-full box-border px-4 py-8">
        <CurrentStage/>
      </div>
    </AppLayout>
  )
}
