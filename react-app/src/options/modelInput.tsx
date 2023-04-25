import { useState, useEffect, useCallback, ChangeEvent } from "react";

const modelOptions = [
    { value: "gpt-4", label: "gpt-4" },
    { value: "gpt-4-32k", label: "gpt-4-32k" },
    { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    { value: "gpt-3.5-turbo-0301", label: "gpt-3.5-turbo-0301" },
];

export function ModelInput() {
    const [model, setModel] = useState("gpt-3.5-turbo");

    const handleModelChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const newModel = event.target.value;
        setModel(newModel);
        chrome.storage.local.set({ model: newModel });
    }, []);

    useEffect(() => {
        chrome.storage.local.get({ model: "gpt-3.5-turbo" }, ({ model }) => {
            setModel(model);
        });
    }, []);

    return (
        <select
            id="model"
            className="cs-block cs-w-full cs-rounded-lg cs-border cs-border-gray-300 cs-bg-gray-50 cs-p-2.5 cs-text-sm cs-text-gray-900 focus:cs-border-blue-500 focus:cs-ring-blue-500"
            value={model}
            onChange={handleModelChange}
        >
            {modelOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
}

export default ModelInput;
