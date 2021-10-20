// ! Next and React
import { NextApiRequest, NextApiResponse } from 'next';

// ! Library
import puppeteer from "puppeteer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const url = req.body.url;
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });
        const htmlDocument = await page.content();
        const pageScreenshot = await page.screenshot({ encoding: "base64", fullPage: true });

        res.status(200).json({ html: htmlDocument, preview: pageScreenshot });
    } catch (error) {
        console.log(error);
        res.status(500).json({ html: null, preview: null });
    } finally {
        await browser.close();
    }
}
