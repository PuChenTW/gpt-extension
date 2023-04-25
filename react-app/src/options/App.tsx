import { PromptInput } from "./promptInput"
import { KeyInput } from "./keyInput"
import { ModelInput } from "./modelInput"
import { LanguageInput } from "./languageInput"

interface labelName {
    labelName: string;
}

function Label({ labelName }: labelName) {
    return (
        <label className="cs-block cs-text-sm cs-font-medium cs-text-gray-900">
            {labelName}
        </label>
    );
}

function App() {
    return (
        <div className="cs-flex cs-h-screen cs-items-center cs-justify-center">
            <div className="cs-grid cs-grid-cols-2 cs-items-center cs-gap-4">
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
