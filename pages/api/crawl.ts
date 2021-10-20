// ! Next and React
import { NextApiRequest, NextApiResponse } from 'next';

// ! Library
import { JSDOM } from "jsdom";
import puppeteer from 'puppeteer';
import blocks from '../../lib/content/blocks';
import stepsMap, {
    navigateLink,
    selectElement,
    selectElements,
    selectHead,
    getContent,
    mapField
} from "../../lib/functions/steps";
import { stepEntryType } from '../../lib/types';

type resultStepEntry = {
    depth: number,

}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const baseUrl = req.body.url;
    const baseHTMl = req.body.baseHTMl;
    const steps = req.body.steps;
    let maps = [];
    let content = [];
    let selectionsAndMovement = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        const baseDOM = [new JSDOM(baseHTMl).window.document];

        const recursiveAccess = async (array, step) => {
            for (let i = 0; i < array.length; i++) {
                if (array[i] instanceof Array) {
                    array[i] = recursiveAccess(array[i], step);
                } else {
                    switch(step.type) {
                        case "Select Element":
                            array[i] = selectElement(step.fields.selector, array[i]);
                        case "Select Elements":
                            array[i] = selectElements(step.fields.selector, array[i]);
                        case "Select Head":
                            array[i] = selectHead(array[i]);
                        case "Get Content":
                            array[i] = getContent(step.fields.type, step.fields.selector, array[i]);
                        case "Map Field":
                            array[i] = mapField(
                                step.fields.field, step.fields.type, step.field.selector, array[i]);
                        case "Navigate Link":
                            array[i] = await navigateLink(array[i], page);
                    }
                }
            }
        }

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            const latestSelectionIndex = selectionsAndMovement.length - 1;
            const currentSelection =
                latestSelectionIndex < 0 ? baseDOM : selectionsAndMovement[latestSelectionIndex];
            const stepResult = await recursiveAccess(currentSelection, step);

            if (step.type == "Map Field") {
                maps.push(stepResult);
            } else if (step.type == "Get Content") {
                content.push(stepResult);
            } else {
                selectionsAndMovement.push(stepResult);
            }
        }

        console.log(maps);

        res.status(200).json({ results: maps })
    } catch(error) {
        console.log(error);
        res.status(500).json({ results: [] })

    } finally {
        await browser.close();
    }
}


