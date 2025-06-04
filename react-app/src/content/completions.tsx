import { useCallback, useEffect, useState } from "react";
import OpenAI from "openai";

export function useChatGptComplete() {
    const [key, setKey] = useState("");
    const [model, setModel] = useState("gpt-4o");

    useEffect(() => {
        chrome.storage.local.get(
            {
                key: "",
                model: "gpt-4o",
            },
            ({ key, model }) => {
                setKey(key);
                setModel(model);
            },
        );
    }, []);

    return useCallback(
        async (text: string, callback: (content: string) => void) => {
            if (!key) {
                callback("API key is not set. Please set it in the extension options.");
                return;
            }

            const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

            try {
                const stream = await openai.chat.completions.create({
                    model,
                    messages: [{ role: "user", content: text }],
                    max_tokens: text.length + 150,
                    temperature: 0.2,
                    stream: true,
                });

                for await (const chunk of stream) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        callback(content);
                    }
                }
            } catch (error) {
                console.error(error);
                if (error instanceof OpenAI.APIError) {
                    callback(`OpenAI API error: ${error.message}`);
                } else {
                    callback("Something went wrong, please contact the dev team.");
                }
            }
        },
        [key, model],
    );
}
