import { stepBlocksType } from "../types";

const elementAttributeSelectors = ["innerText", "innerHTML", "textContent", "href"];

const blocks = [
    {
        text: "Select Element",
        icon: "fas fa-square",
        tooltip: "Return An Element Matching The Provided Selector",
        category: "Select",
        params: {
            selector: { type: "text", placeholder: "Selector" }
        }
    },
    {
        text: "Select Elements",
        icon: "fas fa-th-large",
        tooltip: "Return Elements Matching The Provided Selector",
        category: "Select",
        params: {
            selector: { type: "text", placeholder: "Selector" }
        }
    },
    {
        text: "Select Head",
        icon: "fas fa-user",
        tooltip: "Specifically select the head tag of a document.",
        category: "Select",
        params: {}
    },
    {
        text: "Map Field",
        icon: "fas fa-columns",
        tooltip: "Add Returned Data To Field For Entry Into A Table.",
        category: "Content",
        params: {
            field: { type: "text", placeholder: "Field" },
            type: {
                type: "text",
                listId: "map-field-list",
                listItems: elementAttributeSelectors,
                placeholder: "Type"
            },
            selector: { type: "text", placeholder: "Selector" }
        }
    },
    {
        text: "Get Content",
        icon: "fas fa-paperclip",
        tooltip: "Get Returned Data From An Element To Be Used In Other Steps",
        category: "Content",
        params: {
            type: {
                type: "text",
                listId: "get-content-list",
                listItems: elementAttributeSelectors,
                placeholder: "Type"
            },
            selector: { type: "text", placeholder: "Selector" }
        }
    },
    {
        text: "Navigate Link",
        icon: "fas fa-external-link-alt",
        tooltip: "Navigate To A Provided Link From Contents, A Field Or An Element.",
        params: {
            // source: { type: "text", placeholder: "Source"}
        }
    },
    {
        text: "Filter Data",
        icon: "fas fa-filter",
        tooltip: "Filter The Data Returned By Fields And Contents With Optional Data Map.",
        params: {
            filter: { type: "text", placeholder: "Filter"}
        }
    },
    {
        text: "Click Element",
        icon: "fas fa-hand-pointer",
        tooltip: "Click An Element On The Page.",
        comingSoon: true,
        params: {}
    },
    {
        text: "Input",
        icon: "fas fa-keyboard",
        tooltip: "Add Text Or Data To An Element",
        comingSoon: true,
        params: {}
    },
    {
        text: "Refresh",
        icon: "fas fa-redo",
        tooltip: "Refresh The Current Page That You're On",
        comingSoon: true,
        params: {}
    },
    {
        text: "Scroll View",
        icon: "fas fa-mouse",
        tooltip: "Scroll The Page You're Currently On To The Bottom",
        comingSoon: true,
        params: {}
    },
    {
        text: "Back To Base",
        icon: "fas fa-home",
        tooltip: "Navigate Back To The Starting Page",
        comingSoon: true,
        params: {}
    }

]

export default blocks;
