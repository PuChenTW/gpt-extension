import { useEffect } from "react";
import { Updater, useImmer } from "use-immer";

export const GrammarPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;
export const SummaryPrompt: string = `Summarize the following article:\n"""\n{{text}}\n"""`;
export const QuizPrompt: string = `Generate a quiz based on this text:\n"""\n{{text}}\n"""`;
export const AnalysisPrompt: string = `Provide me with a brief analysis of this text:\n"""\n{{text}}\n"""`;

export interface promptObject {
    header: string;
    prompt: string;
}

export function usePrompts(): [promptObject[], Updater<promptObject[]>] {
    const [prompts, updatePrompts] = useImmer<promptObject[]>([]);

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompts: [{ header: "Grammer", prompt: GrammarPrompt }],
            },
            ({ prompts }) => {
                updatePrompts(prompts);
            }
        );
    }, [updatePrompts]);

    useEffect(() => {
        chrome.storage.local.set({ prompts });
    }, [prompts]);

    return [prompts, updatePrompts];
}
