import { useState, useEffect, useCallback, ChangeEvent } from "react";

export function KeyInput() {
  const [key, setKey] = useState("");
  const onChangeKey = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKey(e.target.value);
      chrome.storage.local.set({ key: e.target.value });
    },
    [setKey]
  );
  useEffect(() => {
    chrome.storage.local.get(
      {
        key: "",
      },
      ({ key }) => {
        setKey(key);
      }
    );
  }, [setKey]);
  return (
    <input
      type="text"
      id="key"
      className="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      value={key}
      onChange={onChangeKey}
    />
  );
}
