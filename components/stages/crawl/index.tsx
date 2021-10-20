// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import { ApplicationState } from "../../../lib/app";

// ! Components
import Button from "../../misc/buttons";
import ContentSection from "./content";

export default function CrawlStage() {
    const { steps, baseHTML, url, setState } = ApplicationState();

    const [error, setError] = useState(false);

    const runCrawlers = async () => {
        const request = await fetch("/api/crawl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                steps: steps,
                baseHTML: baseHTML,
                url: url
            })
        });

        const response = await request.json();

        setState({ results: response })
        request.status == 200 ? setState({ stage: "export"}) : setError(true);
    }

    useEffect(() => { runCrawlers() });

    return (
      <div className="h-full flex flex-col justify-center">
        <div className="rounded-md bg-white p-5 transition-all flex flex-col justify-center items-center">
            {
                !error ? (
                    <ContentSection
                        title="Working"
                        icon="fas fa-circle-notch fa-spin"
                        subtitle="This May Take A While... Moving to Stage 4 Will Be Automatic."
                    />
                ) : (
                    <>
                        <ContentSection
                            title="Whoops"
                            icon="fas fa-times"
                            subtitle="We Ran Into Issues With The Crawler... Please Go Back And Try Again"
                        />
                        <div className="flex justify-center mt-5">
                            <Button
                                onClick={() => setState({ stage: "queue" })}
                                extendStyle="w-full"
                                alternate
                            >
                                Go Back
                            </Button>
                        </div>
                    </>
                )
            }
        </div>
      </div>
    )
}
