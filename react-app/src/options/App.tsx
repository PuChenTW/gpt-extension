import { useCallback, useRef } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { BlackList } from "./blacklist";
import { PromptInput } from "./promptInput";
import { KeyInput } from "./keyInput";
import { ModelInput } from "./modelInput";
import { LanguageInput } from "./languageInput";
import { usePrompts, PromptConfig } from "../utils/promptsUtils";

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
    const toast = useRef<Toast>(null);

    const onChangePrompt = useCallback(
        (prompt: PromptConfig, idx: number) => {
            updatePrompts((prompts) => {
                prompts[idx] = prompt;
            });
            if (toast.current) {
                toast.current.show({
                    severity: "info",
                    summary: "Prompt saved",
                    detail: `${prompt.header} prompt saved`,
                });
            }
        },
        [updatePrompts]
    );

    const onDeletePrompt = useCallback(
        ({ index }: { index: number }) => {
            updatePrompts((prompts) => {
                return prompts.filter((_, idx) => idx != index - 1)
            });
            // Return false to avoid default behavior of closing the tab
            return false;
        },
        [updatePrompts]
    );

    const onAddPrompt = useCallback(() => {
        updatePrompts((prompts) => [
            ...prompts,
            {
                header: `Prompt ${prompts.length}`,
                prompt: "Type your prompt here: {{text}}",
                icon: "",
                bgcolor: "#FFFFFF",
                color: "#000000"
            },
        ]);
    }, [updatePrompts])

    return (
        <div className="cs-flex cs-flex-col cs-w-screen cs-items-center cs-absolute cs-top-32">
            <Toast ref={toast} />
            <div className="cs-w-1/2 cs-relative">
                <TabView onBeforeTabClose={onDeletePrompt}>
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
                            <Label labelName="BlackList Domain"></Label>
                            <BlackList />
                        </div>
                    </TabPanel>
                    {prompts.map((prompt, idx) => (
                        <TabPanel
                            header={prompt.header}
                            prevButton={undefined}
                            nextButton={undefined}
                            closeIcon={undefined}
                            key={`${prompt.header}_${idx}`}
                            closable={idx > 0}
                        >
                            <PromptInput
                                promptObj={prompt}
                                onChange={(prompt: PromptConfig) => {
                                    onChangePrompt(prompt, idx);
                                }}
                            />
                        </TabPanel>
                    ))}
                </TabView>
                <div className="cs-absolute" style={{ top: "0.25rem", right: "-10px" }}>
                    <Button
                        size="small"
                        icon="pi pi-plus"
                        rounded
                        text
                        disabled={prompts.length >= 4}
                        onClick={onAddPrompt}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
