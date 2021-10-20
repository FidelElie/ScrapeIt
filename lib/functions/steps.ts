// ! Library
import { JSDOM } from "jsdom";
import { Page } from "puppeteer";

const selectElement = (selector, dom): HTMLElement[] =>
    [dom.querySelector(selector)];

const selectElements = ({ selector }, dom): Element[] => {
    const elements = dom.querySelectorAll(selector);

    return Array.from(elements);
}

const selectHead = (dom): HTMLHeadElement => dom.head;

const navigateLink = async (link, page: Page): Promise<HTMLDocument> =>  {
    await page.goto(link, { waitUntil: "networkidle2" });

    const pageSource = await page.content();
    const html = new JSDOM(pageSource).window.document;

    return html;
}

const getContent = (type, selector, dom) => {
    const domElement = selectElement({ selector }, dom)[0];

    if (!domElement) return null;

    switch (type) {
        case "innerText":
            return domElement.innerText.trim();
        case "innerHTML":
            return domElement.innerHTML.trim();
        case "textContent":
            return domElement.textContent.trim();
        case "href":
            return domElement.getAttribute("href");
        default:
            return domElement.getAttribute(type);
    }
}

const mapField = (field, type, selector, dom) => {
    const contentToMap = getContent(type, selector, dom);

    return { [field]: contentToMap }
}

const stepsMap = {
    selectElement,
    selectElements,
    selectHead,
    navigateLink,
    mapField,
    getContent
}

export default stepsMap;

export {
    selectElement,
    selectElements,
    selectHead,
    navigateLink,
    mapField,
    getContent
}
