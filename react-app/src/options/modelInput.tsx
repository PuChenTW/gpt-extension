import { useState, useEffect, useCallback, ChangeEvent } from "react";

const modelOptions = [
    { value: "gpt-4o", label: "gpt-4o" },
    { value: "gpt-4", label: "gpt-4" },
    { value: "gpt-4-0613", label: "gpt-4-0613" },
    { value: "gpt-4-32k-0613", label: "gpt-4-32k-0613" },
];

const defaultModel = "gpt-3.5-turbo";

export function ModelInput() {
    const [model, setModel] = useState(defaultModel);

    const handleModelChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const newModel = event.target.value;
        setModel(newModel);
        chrome.storage.local.set({ model: newModel });
    }, []);

    useEffect(() => {
        chrome.storage.local.get({ model: defaultModel }, ({ model }) => {
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
