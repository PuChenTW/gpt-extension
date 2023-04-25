
import { TabView, TabPanel} from 'primereact/tabview';

import { PromptInput } from "./promptInput"
import { KeyInput } from "./keyInput"
import { ModelInput } from "./modelInput"
import { LanguageInput } from "./languageInput"

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

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
        <div className="cs-flex cs-h-screen cs-w-screen cs-items-center cs-justify-center">
            <TabView className='cs-w-1/3 cs-h-1/3'>
                <TabPanel
                    header="General"
                    prevButton={undefined}
                    nextButton={undefined}
                    closeIcon={undefined}
                >
                    <div className="cs-grid cs-grid-cols-2 cs-items-center cs-gap-4">
                        <Label labelName="Primary Language"></Label>
                        <LanguageInput />
                        <Label labelName="Your ChatGPT API Key"></Label>
                        <KeyInput />
                        <Label labelName="Model"></Label>
                        <ModelInput />
                    </div>
                </TabPanel>
                <TabPanel
                    header="Prompt I"
                    prevButton={undefined}
                    nextButton={undefined}
                    closeIcon={undefined}
                >
                    <div className="cs-flex cs-justify-center">
                        <PromptInput />
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
}

export default App;
