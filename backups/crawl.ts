// ! Next and React
import { NextApiRequest, NextApiResponse } from 'next';

// ! Library
import { JSDOM } from "jsdom";
import puppeteer from "puppeteer";
import { getBaseElements } from "../lib/functions";

// ! Types And Interfaces
type stepsType = { id: string, field: string, type: string, selector: string }

type step = { id: string, status: string }
type stepsReportType = { statuses: step[], map: Object }
type crawlerReportType = {
    id: string,
    mode: string,
    status: string,
    results: stepsReportType[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const crawlers = req.body.crawlers;
    const baseHTML = req.body.html;
    const baseUrl = req.body.url;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let crawlerReports = new Array(crawlers.length).fill(<crawlerReportType>{});
    try {
        const websiteDOM = new JSDOM(baseHTML).window.document;

        for (let crawlerIndex = 0; crawlerIndex < crawlers.length; crawlerIndex++) {
            const crawler = crawlers[crawlerIndex];
            let crawlerReport: crawlerReportType = {
                id: crawler.id,
                mode: crawler.mode,
                status: "Success",
                results: []
            }
            const crawlerElements = getBaseElements(websiteDOM, crawler);

            if (crawlerElements.length == 0) {
                // Crawler Failure - Move To Next Crawler
                crawlerReport.status = "No Element Was Found From Base Selector";

                crawlerReports[crawlerIndex] = crawlerReport;
                continue;
            }

            for (let elementIndex = 0; elementIndex < crawlerElements.length; elementIndex++) {
                let stepsReport: stepsReportType = { statuses: [], map: {} };

                const element = crawlerElements[elementIndex];
                const crawlerSteps = crawler.steps;
                const uniqueIds = crawlerSteps.map(step => step.id).filter(id => !id.includes("."));

                for (let idIndex = 0; idIndex < uniqueIds.length; idIndex++) {
                    const id = uniqueIds[idIndex]
                    const correspondingSteps = crawlerSteps.filter(step => (step.id).split(".")[0] == id);

                    // ? Check if Sub Queue Exists
                    if (correspondingSteps.length > 1) {
                        const baseStep = correspondingSteps[0];
                        const subSteps = correspondingSteps.slice(1);

                        const [baseStepData, elementContent] = getStepContent(element, baseStep, stepsReport.map, baseUrl);

                        // console.log(elementContent)
                        // console.log(baseUrl)
                        // const urlToNavigate = normaliseUrl(elementContent, baseUrl);

                        // ? Content Could Not Be Found In Step
                        if (baseStepData.status != "Success") {
                            stepsReport.statuses.push({id: baseStep.id, status: "Failed To Find Element Content"});
                            subSteps.array.forEach(step => {
                                stepsReport.statuses.push({ id: step.id, status: "New Page Failure Invalidation"});
                                if (step.field != "") stepsReport.map[step.field] = null;
                            });
                            continue;
                        }

                        // console.log(urlToNavigate)
                        console.log(elementContent)

                        await page.goto(elementContent, { waitUntil: "networkidle2" });
                        const htmlDocument = await page.content();

                        // ? Look for error in finding new page
                        if (htmlDocument.length == 0) {
                            stepsReport.statuses.push({id: baseStep.id, status: "Failed To Fetch Page HTML Source"});
                            subSteps.array.forEach(step => {
                                stepsReport.statuses.push({id: step.id, status: "New Page Failure Invalidation"});
                                if (step.field != "") stepsReport.map[step.field] = null;
                            });
                            continue;
                        }

                        stepsReport.statuses.push({id: baseStep.id, status: "Success"});
                        const virtualDOM = new JSDOM(htmlDocument).window.document;

                        // Loop Over SubSteps
                        for (let stepIndex = 0; stepIndex < subSteps.length; stepIndex++) {
                            const stepData = getStepContent(virtualDOM, subSteps[stepIndex], stepsReport.map, baseUrl)[0];
                            console.log(stepData)
                            stepsReport.statuses.push(stepData);
                        }
                    } else {
                        const stepData = getStepContent(element, correspondingSteps[0], stepsReport.map, baseUrl)[0];
                        stepsReport.statuses.push(stepData);
                    }
                }

                crawlerReport.results.push(stepsReport);
            }
            crawlerReports[crawlerIndex] = crawlerReport;
        }

        crawlerReports.forEach((crawler, index) => {
            const results = crawler.results;

            const errorResultStatuses = results
                .map(result => result.statuses)
                .flat()
                .map(status => status.status).flat()
                .filter(status => status != "Success");

            if (errorResultStatuses.length > 0) {
                crawlerReports[index].status = "Partial Success"
            }
        });


        const mainCrawler = crawlerReports.find(crawler => crawler.mode == "recurring");
        const auxillaryCrawlers = crawlerReports.filter(crawler => crawler.mode != "recurring");

        const reports = [mainCrawler].concat(auxillaryCrawlers);

        res.status(200).json(reports);
    } catch (error) {
        console.log(error);
        res.status(500).json(crawlerReports);
    } finally {
        await browser.close();
    }
}

const getStepContent = (element, step, map, baseUrl) => {
    const stepRequiresMapping = step.field != "";
    // console.log(element)
    const elementInDom = step.selector != "" ? element.querySelector(step.selector) : element;
    // console.log(elementInDom);
    const elementContent = mapHTMLProperties(elementInDom, step, baseUrl);
    // console.log(elementContent)

    if (!elementContent) {
        if (stepRequiresMapping) map[step.field] = null;
        return [{id: step.id, status: "Element Content Not Found"}, null];
    }

    if (stepRequiresMapping) map[step.field] = elementContent;

    return [{ id: step.id, status: "Success" }, elementContent];
}

const normaliseUrl = (url: string, baseUrl: string) => {
    console.log(url)
    console.log(baseUrl)
    const urlIsRelative = !url.startsWith("https://") || !url.startsWith("http://");
    let normalisedUrl: string;

    const splitBaseUrl = baseUrl.split("/");
    const baseDomain = `${splitBaseUrl[0]}//${splitBaseUrl[2]}`;

    if (urlIsRelative) {
        normalisedUrl = `${baseDomain}/${url}`;
    } else {
      normalisedUrl = url
    }

    return normalisedUrl;
}

const mapHTMLProperties = (domElement, step: stepsType, baseUrl) => {
    if (domElement == null || domElement == undefined) return null;

    if (step.type == "innerText") {
        return domElement.innerText.trim();
    } else if (step.type == "innerHTML") {
        return domElement.innerHTML.trim();
    } else if (step.type == "textContent") {
        return domElement.textContent.trim();
    } else {
        let attributeValue = domElement.getAttribute(step.type);
        // Normalise A Href Attribute By Default
        if (step.type == "href") {
            attributeValue = normaliseUrl(attributeValue, baseUrl);
        }
        return attributeValue;
    }
}
