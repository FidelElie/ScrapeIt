import { makeStringTitle } from "./utils";

// ! Types And Interfaces
type stepsType = { id: string, field: string, type: string, selector: string }
type crawlerType = { id: string, mode: string, baseSelector: string, steps: stepsType[] }

const getBaseElements = (DOM, crawler: crawlerType) => {
    const crawlerMode = crawler.mode;
    if (crawlerMode == "recurring") {
        return Array.from(DOM.querySelectorAll(crawler.baseSelector));
    } else if (crawlerMode == "specific") {
        return Array.from(DOM.querySelector(crawler.baseSelector)).filter(x => x != null);
    } else {
        return [DOM.head];
    }
}

const exportInformation = async (crawlerResults, orders, exportMap, fieldMaps) => {
    let data = [];

    const fieldOrders = orders.filter(order => order[1] != 0).sort((a, b) => a[1] - b[1]);

    const mainCrawler = crawlerResults.find(crawler => crawler.mode == "recurring");
    const auxillaryCrawlers = crawlerResults.filter(crawler => crawler.mode != "recurring");

    const mainResultSet = mainCrawler.results.map(result => result.map);

    mainResultSet.forEach(set => {
        let dataPoint = {}

        for (let order of fieldOrders) {
            const field = order[0];
            dataPoint[field] = field in set ? set[field].replace("\n", " ") : null
        }

        data.push(dataPoint);
    });

    // Add Values That Are Common Throughout Datasets
    auxillaryCrawlers.forEach(crawler => {
        const resultMaps = crawler.results.map(result => result.map);

        for (let dataIndex; dataIndex < data.length; dataIndex++) {
            let modifiedDataPoint = data[dataIndex];

            for (let mapEntry of Object.entries(resultMaps)) {
                const [field, value] : [string, any] = mapEntry;

                if (field in modifiedDataPoint) modifiedDataPoint[field] = value.replace("\n", " ");
            }

            data[dataIndex] = modifiedDataPoint
        }
    })

    if (exportMap.options.exportHumanReadable) {
        data = data.map(point => Object.fromEntries(
                Object.entries(point).map(cell => [makeStringTitle(cell[0]), cell[1]])
            )
        );
    }

    const fileName = exportMap.info.fieldUsed ? data[0][exportMap.info.name] : exportMap.info.name;

    const exportFormatData = {
        exportToCSV: {
           generate: () => generateCSVUri(data, fieldOrders.map(order => order[0])),
           extension: ".csv"
        },
        exportToJSON: {
            generate: () => generateJSONUri(data),
            extension: ".json"
        }
    }

    const downloadLink = document.getElementById("download-link");

    for (let entry of Object.entries(exportMap.formats)) {
        const [exportKey, exportFormatEnabled] = entry;

        if (exportFormatEnabled) {
            const correspondingFormatData = exportFormatData[exportKey];
            const generatedURI = correspondingFormatData.generate();
            const generatedFileName = `${fileName}${correspondingFormatData.extension}`;

            if (!exportMap.options.exportUsingZip) {
                downloadLink.setAttribute("href", generatedURI);
                downloadLink.setAttribute("download", generatedFileName);
                downloadLink.click();
            }
        }

    }
}

const generateCSVUri = (dataObjects, headers) => {
    const dataArrays = dataObjects.map(object => Object.values(object));
    const rows = [headers].concat(dataArrays);

    const csvContent = "data:text/csv;charset:utf-8," +
        rows.map(e => e.join(",")).join("\n");

    return encodeURI(csvContent);
}

const generateJSONUri = (dataObjects) => {
    const jsonContent = "data:application/json," +
    JSON.stringify(dataObjects);

    return encodeURI(jsonContent)
}

export { getBaseElements, exportInformation }
