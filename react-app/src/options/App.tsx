import { PromptInput } from "./promptInput"
import { KeyInput } from "./keyInput"
import { ModelInput } from "./modelInput"
import { LanguageInput } from "./languageInput"
import "./App.css";

interface labelName {
  labelName: string;
}

function Label({ labelName }: labelName) {
  return (
    <label className="block text-sm font-medium text-gray-900">
      {labelName}
    </label>
  );
}

function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-2 items-center gap-4">
        <Label labelName="Primary Language"></Label>
        <LanguageInput />
        <Label labelName="Your ChatGPT API Key"></Label>
        <KeyInput />
        <Label labelName="Model"></Label>
        <ModelInput />
        <Label labelName="Prompt"></Label>
        <PromptInput />
      </div>
    </div>
  );
}

export default App;
