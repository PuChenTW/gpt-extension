import { useState, useEffect, useCallback, ChangeEvent } from "react";

export function FontSizeInput() {
    const [fontSize, setFontSize] = useState("medium");

    const onChangeFontSize = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            setFontSize(e.target.value);
            chrome.storage.local.set({ fontSize: e.target.value });
        },
        [setFontSize],
    );

    useEffect(() => {
        chrome.storage.local.get(
            {
                fontSize: "medium",
            },
            ({ fontSize }) => {
                setFontSize(fontSize);
            },
        );
    }, [setFontSize]);

    return (
        <select
            id="fontSize"
            className="cs-block cs-w-full cs-rounded-lg cs-border cs-border-gray-300 cs-bg-gray-50 cs-p-2.5 cs-text-sm cs-text-gray-900 focus:cs-border-blue-500 focus:cs-ring-blue-500"
            value={fontSize}
            onChange={onChangeFontSize}
        >
            <option key="Small" value="small">
                small
            </option>
            <option key="Medium" value="medium">
                medium
            </option>
            <option key="Large" value="large">
                large
            </option>
        </select>
    );
}
