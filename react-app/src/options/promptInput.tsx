import { useState, useEffect, useCallback, ChangeEvent } from "react";

const GrammerPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;
const SummaryPrompt: string = `Summarize the following article:\n"""\n{{text}}\n"""`;

export function PromptInput() {
    const [prompt, setPrompt] = useState(GrammerPrompt);
    const onChangePrompt = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setPrompt(e.target.value);
            chrome.storage.local.set({ prompt: e.target.value });
        },
        [setPrompt]
    );

    const onGrammerClick = useCallback(() => {
        setPrompt(GrammerPrompt);
        chrome.storage.local.set({ prompt: GrammerPrompt });
    }, [setPrompt]);

    const onSummaryClick = useCallback(() => {
        setPrompt(SummaryPrompt);
        chrome.storage.local.set({ prompt: SummaryPrompt });
    }, [setPrompt]);

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompt: GrammerPrompt,
            },
            ({ prompt }) => {
                setPrompt(prompt);
            }
        );
    }, [setPrompt]);
    return (
        <div>
            <textarea
                id="prompt"
                className="cs-w-80 cs-block cs-text-sm cs-p-2 cs-rounded-md cs-border cs-border-gray-300 cs-h-40"
                onInput={onChangePrompt}
                value={prompt}
            />
            <p className="cs-font-sans cs-text-teal-800">
                {"{{text}} will be replaced with selected text"}
            </p>
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
    );
}
