// ! Next and React
import { ChangeEvent, useEffect, useState } from "react";

// ! Library
import { ApplicationState } from "../../../lib/app";
import { urlBarTypes as ComponentProps } from "../../../lib/types";

// ! Components
import Button from "../../misc/buttons";
import { Input, Checkbox } from "../../misc/forms";

export default function GenericAddress(props: ComponentProps) {
  const { choose, openURL, setOpenURL } = props;

  const { url, setState } = ApplicationState();
  const [secured, setSecured] = useState(true);
  // TODO add validation for urls
  const [invalidUrl, setInvalidUrl] = useState(false);

  useEffect(() => {setState({url: ""});}, []);

  useEffect(() => {
    if (url.includes("https://")) {
      setSecured(true);
    } else if (url.includes("http://")) {
      setSecured(false);
    }

    setInvalidUrl(false);

    if (url == "") setInvalidUrl(true);
  }, [url]);

  return (
    <div className="flex flex-col">
      <Input
        type="text"
        id="url"
        name="url"
        placeholder="Enter a URL"
        autoComplete="off"
        extendStyle="mb-3"
        value={url}
        onChange={(e: ChangeEvent) => setState({
          url: (e.target as HTMLInputElement).value
        })}
        screenReader
      />
      <div className="flex justify-between">
        <div className="flex">
          <Checkbox
            checked={secured}
            onChange={() => setSecured(!secured)}
            label={ secured ? "Secure" : "Unsecure"}
          />
          <Checkbox
            checked={openURL}
            onChange={() => setOpenURL(!openURL)}
            label={ openURL ? "Open URL" : "Don't Open URL"}
            extendLabelStyle="ml-3"
          />
        </div>
        <div className="flex">
          <Button onClick={() => choose(secured ? "https://" : "http://")} disabled={invalidUrl} extendStyle="disabled:opacity-50">
            Choose
          </Button>
        </div>
      </div>
    </div>
  )

}
