// ! Next and React
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { ApplicationState } from "../../../lib/app";
import { urlBarTypes as ComponentProps } from "../../../lib/types";

// ! Components
import Button from "../../misc/buttons";
import { Input, Checkbox } from "../../misc/forms";

// ! Variables
const searchNumberOptions: number[] = [10, 15, 20, 25, 50, 100, 250, 1000];

const baseGoogleUrl = "https://www.google.com/";

export default function GoogleSearch(props: ComponentProps) {
  const { choose, openURL, setOpenURL } = props;

  const { url, setState } = ApplicationState();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(searchNumberOptions[0]);
  const [showUrl, setShowUrl] = useState(false);

  const generateGRL = () => {
    const urlFriendlyString = search.split(" ").map(x => x.trim()).join("+");

    const queryString = urlFriendlyString != "" ? urlFriendlyString : "{ }";

    return `${baseGoogleUrl}search?q=${queryString}&num=${results}`;
  }

  useEffect(() => {setState({ url: generateGRL() });}, []);

  useEffect(() => {setState({ url: generateGRL() })}, [search, results]);

  return (
    <div className="flex flex-col">
      {
        showUrl && <span className="mb-3 text-gray-500">{url}</span>
      }
      <label htmlFor="search" className="sr-only">Google Search</label>
      <Input
        type="text"
        id="search"
        name="search"
        placeholder="Search Google"
        autoComplete="off"
        value={search}
        onChange={(event: ChangeEvent) => {
          setSearch((event.target as HTMLInputElement).value)
        }}
        screenReader
      />
      <div className="flex justify-center my-2">
        <Checkbox
          label="Show URL"
          checked={showUrl}
          onChange={() => setShowUrl(!showUrl)}
        />
        <Checkbox
          checked={openURL}
          onChange={() => setOpenURL(!openURL)}
          label={openURL ? "Open URL" : "Don't Open URL"}
          extendLabelStyle="ml-3"
        />
        <div className="ml-3 flex items-center">
          <select className="rounded-md border-none appearance-none w-20 focus:ring-none" value={results}
            onChange={(event) => {
              setResults(parseInt((event.target as HTMLSelectElement).value, 10));
            }}
          >
            { searchNumberOptions.map(numb => <option key={numb}>{ numb }</option>)}
          </select>
          <label className="text-gray-500 tracking-tight">Results Per Page</label>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={choose}>
          Choose
        </Button>
      </div>
    </div>
  )
}
