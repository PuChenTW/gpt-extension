import { useState, useCallback, ChangeEvent } from "react";
import { GrammerPrompt, SummaryPrompt, AnalysisPrompt, QuizPrompt} from "../utils/promptsUtils"

export function PromptInput({prompt, onChange}: {prompt: string, onChange: Function}) {
    const [localPrompt, setLocalPrompt] = useState(prompt);
    const onChangePrompt = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setLocalPrompt(e.target.value);
            onChange(e.target.value)
        },
        [setLocalPrompt]
    );

    const onPredefinedPrompt = useCallback((prompt: string) => {
        setLocalPrompt(prompt);
        onChange(prompt) 
    }, [setLocalPrompt])

    return (
        <div className="cs-flex cs-flex-col cs-items-center">
            <textarea
                id="prompt"
                className="cs-w-80 cs-block cs-text-sm cs-p-2 cs-rounded-md cs-border cs-border-gray-300 cs-h-40"
                onInput={onChangePrompt}
                value={localPrompt}
            />
            <p className="cs-font-sans cs-text-teal-800">
                {"{{text}} will be replaced with selected text"}
            </p>
            <div>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-blue-500 hover:cs-bg-blue-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {onPredefinedPrompt(GrammerPrompt)}}
                >
                    Grammer
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-green-500 hover:cs-bg-green-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {onPredefinedPrompt(SummaryPrompt)}}
                >
                    Summary
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-yellow-500 hover:cs-bg-yellow-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {onPredefinedPrompt(QuizPrompt)}}
                >
                    Quiz
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-red-500 hover:cs-bg-red-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {onPredefinedPrompt(AnalysisPrompt)}}
                >
                    Analysis
                </button>
            </div>
        </div>
    );
}
