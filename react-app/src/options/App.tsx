
import { useCallback, useEffect } from 'react';
import { useImmer } from "use-immer";
import { TabView, TabPanel} from 'primereact/tabview';

import { PromptInput, GrammerPrompt } from "./promptInput"
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

interface promptObject {
    header: string
    prompt: string
}

function App() {

    const [prompts, updatePrompts] = useImmer<promptObject[]>([])

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompts: [{header: "Grammer", prompt: GrammerPrompt}],
            },
            ({ prompts }) => {
                console.log(prompts)
                updatePrompts(prompts);
            }
        );
    }, [updatePrompts])

    useEffect(() => {
        chrome.storage.local.set({prompts})
    }, [prompts])

    const onChangePrompt = useCallback((prompt: string, idx: number) => {
        updatePrompts(prompts => {
            prompts[idx].prompt = prompt
        })
    }, [updatePrompts])

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
                        <Label labelName="Primary Language (Google translate)"></Label>
                        <LanguageInput />
                        <Label labelName="Your ChatGPT API Key"></Label>
                        <KeyInput />
                        <Label labelName="Model"></Label>
                        <ModelInput />
                    </div>
                </TabPanel>
                {prompts.map(({header, prompt}, idx) => (
                    <TabPanel
                        header={header}
                        prevButton={undefined}
                        nextButton={undefined}
                        closeIcon={undefined}
                        key={`${header}_${idx}`}
                    >
                        <PromptInput 
                            prompt={prompt}
                            onChange={(prompt: string) => {onChangePrompt(prompt, idx)}}
                        />
                    </TabPanel>
                ))}
            </TabView>
        </div>
    );
}

export default App;
