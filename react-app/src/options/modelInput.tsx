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
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
