import { useState, useEffect, useCallback, ChangeEvent } from "react";

const DefaultPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;

export function PromptInput() {
    const [prompt, setPrompt] = useState(DefaultPrompt);
    const onChangePrompt = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setPrompt(e.target.value);
            chrome.storage.local.set({ prompt: e.target.value });
        },
        [setPrompt]
    );

    const onResetClick = useCallback(() => {
        setPrompt(DefaultPrompt);
        chrome.storage.local.set({ prompt: DefaultPrompt });
    }, [setPrompt]);

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompt: DefaultPrompt,
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
                id="reset"
                className="cs-my-2 cs-bg-blue-500 hover:cs-bg-blue-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                onClick={onResetClick}
            >
                Reset
            </button>
        </div>
    );
}
