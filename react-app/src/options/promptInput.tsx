import { useCallback, ChangeEvent, useState } from "react";
import {
    GrammarPrompt,
    SummaryPrompt,
    AnalysisPrompt,
    QuizPrompt,
} from "../utils/promptsUtils";
import { InputText } from "primereact/inputtext";
import { promptObject } from "../utils/promptsUtils";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";

export function PromptInput({
    promptObj,
    onChange,
}: {
    promptObj: promptObject;
    onChange: Function;
}) {
    const [localPrompt, setLocalPrompt] = useState(promptObj.prompt);
    const [localHeader, setLocalHeader] = useState(promptObj.header);
    const onChangePrompt = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setLocalPrompt(e.target.value);
        },
        [setLocalPrompt]
    );

    const onPredefinedPrompt = useCallback(
        (header: string, prompt: string) => {
            setLocalPrompt(prompt);
            setLocalHeader(header);
        },
        [setLocalPrompt, setLocalHeader]
    );

    const onChangeHeader = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setLocalHeader(e.target.value);
        },
        [setLocalPrompt]
    );

    const onSave = useCallback(() => {
        onChange({ prompt: localPrompt, header: localHeader });
    }, [localPrompt, localHeader]);

    return (
        <div className="cs-flex cs-flex-col">
            <Fieldset legend="Name">
                <div className="cs-flex cs-items-center cs-mb-2 cs-gap-2">
                    <InputText
                        className="p-inputtext-sm"
                        value={localHeader}
                        onInput={onChangeHeader}
                    />
                </div>
            </Fieldset>
            <Fieldset className="cs-mt-2" legend="Prompt">
                <div>
                    <textarea
                        id="prompt"
                        className="cs-w-80 cs-block cs-text-sm cs-p-2 cs-rounded-md cs-border cs-border-gray-300 cs-h-40"
                        onChange={onChangePrompt}
                        value={localPrompt}
                    />
                    <p className="cs-font-sans cs-text-teal-800">
                        {"{{text}} will be replaced with selected text"}
                    </p>
                </div>
            </Fieldset>
            <div className="cs-relative">
                <button
                    id="grammer"
                    className="cs-my-2 cs-mr-2 cs-bg-blue-500 hover:cs-bg-blue-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Grammer", GrammarPrompt);
                    }}
                >
                    Grammar
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-green-500 hover:cs-bg-green-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Summary", SummaryPrompt);
                    }}
                >
                    Summary
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-yellow-500 hover:cs-bg-yellow-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Quiz", QuizPrompt);
                    }}
                >
                    Quiz
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-red-500 hover:cs-bg-red-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Analysis", AnalysisPrompt);
                    }}
                >
                    Analysis
                </button>
                <div className="cs-absolute cs-right-0 cs-top-0 cs-my-2">
                    <Button
                        disabled={
                            localPrompt == promptObj.prompt && localHeader == promptObj.header
                        }
                        onClick={onSave}
                        icon="pi pi-save"
                    />
                </div>
            </div>
        </div>
    );
}
