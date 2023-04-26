import { useEffect } from "react";
import { Updater, useImmer } from "use-immer";

export const GrammerPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;
export const SummaryPrompt: string = `Summarize the following article:\n"""\n{{text}}\n"""`;

interface promptObject {
    header: string
    prompt: string
}

export function usePrompts() : [promptObject[], Updater<promptObject[]>] {
    const [prompts, updatePrompts] = useImmer<promptObject[]>([])

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompts: [{header: "Grammer", prompt: GrammerPrompt}],
            },
            ({ prompts }) => {
                updatePrompts(prompts);
            }
        );
    }, [updatePrompts])

    useEffect(() => {
        chrome.storage.local.set({prompts})
    }, [prompts])

    return [prompts, updatePrompts]
}
