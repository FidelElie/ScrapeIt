// ! Next and React
import { useState, createContext, ReactNode, useContext, FC } from "react";

// ! Types
import { appStateTypes } from "./types";

const initialAppState : appStateTypes = {
  stage: "url",
  url: "",
  baseHTML: "",
  preview: null,
  steps: [],
  results: []
}

const ApplicationContext = createContext(null);

const ApplicationProvider: FC = ({ children }: { children: ReactNode }) => {
    const [appState, setAppState] = useState<appStateTypes>(initialAppState);

    return (
        <ApplicationContext.Provider value={{
          ...appState,
          setState: (data) => setAppState({...appState, ...data})
        }}>
          { children }
        </ApplicationContext.Provider>
    )
}

const ApplicationState = () => {
  const {
    stage,
    url,
    baseHTML,
    preview,
    steps,
    results,
    setState
  } = useContext(ApplicationContext);

  return { stage, url, baseHTML, preview, steps, results, setState }
}

export default ApplicationProvider;
export { ApplicationState, initialAppState };
