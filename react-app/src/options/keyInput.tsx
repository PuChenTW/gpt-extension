import { useState, useEffect, useCallback, ChangeEvent } from "react";

export function KeyInput() {
    const [key, setKey] = useState("");
    const onChangeKey = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setKey(e.target.value);
            chrome.storage.local.set({ key: e.target.value });
        },
        [setKey],
    );
    useEffect(() => {
        chrome.storage.local.get(
            {
                key: "",
            },
            ({ key }) => {
                setKey(key);
            },
        );
    }, [setKey]);
    return (
        <input
            type="text"
            id="key"
            className="cs-block cs-rounded-md cs-border-0 cs-py-1.5 cs-pl-7 cs-pr-7 cs-text-gray-900 cs-ring-1 cs-ring-inset cs-ring-gray-300 placeholder:cs-text-gray-400 focus:cs-ring-2 focus:cs-ring-inset focus:cs-ring-indigo-600 sm:cs-text-sm sm:cs-leading-6"
            value={key}
            onChange={onChangeKey}
        />
    );
}
