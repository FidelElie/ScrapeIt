export type appStateTypes = {
    stage: "url" | "steps" | "crawl" | "export",
    url: string,
    baseHTML: string,
    preview: string | null,
    steps: [],
    results: []
}

export type urlBarTypes = {
    choose: Function,
    openURL: boolean,
    setOpenURL: Function
}

export type stepBlockType = {
    text: string,
    icon: string,
    tooltip: string,
    flags?: {
        async?: boolean,
        requiresDom?: boolean,
        requiresPage?: boolean,
        requiresStepData?: boolean
    },
    params?: Object,
    comingSoon?: boolean
}

export type stepBlocksType = stepBlockType[];

export type stepEntryType = {
    type: string,
    icon: string,
    params: Object,
    fields: Object
}
