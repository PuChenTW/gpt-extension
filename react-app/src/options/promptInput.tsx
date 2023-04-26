import { useState, useCallback, ChangeEvent } from "react";

export const GrammerPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;
const SummaryPrompt: string = `Summarize the following article:\n"""\n{{text}}\n"""`;

export function PromptInput({prompt, onChange}: {prompt: string, onChange: Function}) {
    const [localPrompt, setLocalPrompt] = useState(prompt);
    const onChangePrompt = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setLocalPrompt(e.target.value);
            onChange(e.target.value)
        },
        [setLocalPrompt]
    );

    const onGrammerClick = useCallback(() => {
        setLocalPrompt(GrammerPrompt);
        onChange(GrammerPrompt)
    }, [setLocalPrompt]);

    const onSummaryClick = useCallback(() => {
        setLocalPrompt(SummaryPrompt);
        onChange(SummaryPrompt)
    }, [setLocalPrompt]);

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
                    className="cs-my-2 cs-bg-blue-500 hover:cs-bg-blue-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={onGrammerClick}
                >
                    Grammer
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-green-500 hover:cs-bg-green-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={onSummaryClick}
                >
                    Summary
                </button>
            </div>
        </div>
    );
}
