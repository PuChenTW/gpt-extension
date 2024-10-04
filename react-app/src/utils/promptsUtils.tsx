import { useEffect } from "react";
import { Updater, useImmer } from "use-immer";

export const GrammarPrompt: string = `Check the grammar of the following:\n"""\n{{text}}\n"""\nReturn only the corrected sentence. Do not include explanations or reasons`;
export const SummaryPrompt: string = `Summarize the following article:\n"""\n{{text}}\n"""`;
export const DefinitionPrompt: string = `Provide a clear and concise definition or explanation for the following term or concept:\n"""\n{{text}}\n"""\nIf it's a complex topic, give a brief overview that a general audience can understand.`;


export interface PromptConfig {
    header: string;
    prompt: string;
    icon: string;
    bgcolor: string;
    color: string;
}

const defaultPrompt: PromptConfig = {
    header: "Grammer",
    prompt: GrammarPrompt,
    icon: "🔍",
    bgcolor: "#84CC16",
    color: "#000000",
}

export function usePrompts(): [PromptConfig[], Updater<PromptConfig[]>] {
    const [prompts, updatePrompts] = useImmer<PromptConfig[]>([]);

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompts: [defaultPrompt],
            },
            ({ prompts }) => {
                updatePrompts(prompts.map((prompt: PromptConfig) => ({...defaultPrompt, ...prompt})));
            }
        );
    }, [updatePrompts]);

    useEffect(() => {
        chrome.storage.local.set({ prompts });
    }, [prompts]);

    return [prompts, updatePrompts];
}
