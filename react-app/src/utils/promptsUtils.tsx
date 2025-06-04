import { useEffect } from "react";
import { Updater, useImmer } from "use-immer";
import OpenAI from "openai";

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
    header: "Grammar",
    prompt: GrammarPrompt,
    icon: "🔍",
    bgcolor: "#84CC16",
    color: "#000000",
};

export function usePrompts(): [PromptConfig[], Updater<PromptConfig[]>] {
    const [prompts, updatePrompts] = useImmer<PromptConfig[]>([]);

    useEffect(() => {
        chrome.storage.local.get(
            {
                prompts: [defaultPrompt],
            },
            ({ prompts }) => {
                updatePrompts(
                    prompts.map((prompt: PromptConfig) => ({ ...defaultPrompt, ...prompt })),
                );
            },
        );
    }, [updatePrompts]);

    useEffect(() => {
        chrome.storage.local.set({ prompts });
    }, [prompts]);

    return [prompts, updatePrompts];
}

export async function generateIconAndColor(
    prompt: string,
): Promise<{ icon: string; bgcolor: string }> {
    const apiKey = await chrome.storage.local.get("key").then((result) => result.key);
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content:
                    "You are a helpful assistant that generates appropriate icons and background colors for prompts.",
            },
            {
                role: "user",
                content: `Generate a single emoji icon and a background color (in hex format) that best represents the following prompt: "${prompt}". Respond in JSON format with "icon" and "bgcolor" keys.`,
            },
        ],
    });

    const result = JSON.parse(chatCompletion.choices[0].message.content || "{}");
    return { icon: result.icon, bgcolor: result.bgcolor };
}
