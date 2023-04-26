
import { useCallback, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';

import { PromptInput } from "./promptInput"
import { KeyInput } from "./keyInput"
import { ModelInput } from "./modelInput"
import { LanguageInput } from "./languageInput"
import { usePrompts, GrammerPrompt } from "../utils/promptsUtils"

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


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
    const [prompts, updatePrompts] = usePrompts();
    const [activeIndex, setActiveIndex] = useState(0)

    const onChangePrompt = useCallback((prompt: string, idx: number) => {
        updatePrompts(prompts => {
            prompts[idx].prompt = prompt
        })
    }, [updatePrompts])

    const onDeletePrompt = useCallback(({ index }: {index: number}) => {
        updatePrompts(prompts => {
            prompts.splice(index - 1, 1)
        });
        return false
    }, [updatePrompts, setActiveIndex, activeIndex]);

    return (
        <div className="cs-flex cs-flex-col cs-h-screen cs-w-screen cs-items-center cs-justify-center">
            <div className='cs-w-1/3 cs-h-1/3 cs-relative'>
                <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                    onBeforeTabClose={onDeletePrompt}
                >
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
                    {prompts.map(({ header, prompt }, idx) => (
                        <TabPanel
                            header={header}
                            prevButton={undefined}
                            nextButton={undefined}
                            closeIcon={undefined}
                            key={`${header}_${idx}`}
                            closable={idx > 0}
                        >
                            <PromptInput
                                prompt={prompt}
                                onChange={(prompt: string) => { onChangePrompt(prompt, idx) }}
                            />
                        </TabPanel>
                    ))}
                </TabView>
                <div
                    className='cs-absolute'
                    style={{top: '0.25rem', right: '-10px'}}
                >
                    <Button
                        size="small"
                        icon="pi pi-plus"
                        rounded
                        text
                        disabled={prompts.length >= 4}
                        onClick={() => {
                            updatePrompts(prompts => [...prompts, { header: `Prompt ${prompts.length}`, prompt: GrammerPrompt }])
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
