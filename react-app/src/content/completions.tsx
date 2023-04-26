import { useCallback, useEffect, useState } from "react";

var msgPrompt = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;

export function useChatGptComplete() {
    const [key, setKey] = useState("")
    const [model, setModel] = useState("gpt-3.5-turbo")

    useEffect(() => {
        chrome.storage.local.get(
            {
                key: "",
                model: "gpt-3.5-turbo",
            },
            ({ key, model }) => {
                setKey(key);
                setModel(model);
            }
        );
    }, [setKey, setModel])
    
    const statusMap = {
        401: "The requesting API key is not correct. Please set the correct API key in options page.",
        429: "The engine is currently overloaded. Retry your request later. If this issue persists, you might exceeded your current quota, please check your plan and billing details",
        500: "Server error. Retry your request later.",
    };

    return useCallback(async (text: string, callback: Function) => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        {
                            role: "user",
                            content: msgPrompt.replace("{{text}}", text),
                        },
                    ],
                    max_tokens: text.length + 150,
                    temperature: 0.2,
                    stream: true,
                }),
            });
    
            if (!response.ok) {
                callback(statusMap?.[response.status as keyof typeof statusMap] ?? "Something went wrong, please contact dev team.");
                return
            }
    
            const reader = response?.body?.getReader();
            const decoder = new TextDecoder("utf-8");
    
            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
    
                const data = decoder.decode(value);
                const messages = data.split("data: ");
                for (const message of messages) {
                    const parsed = message.trim();
                    if (parsed && parsed !== "[DONE]") {
                        const { choices } = JSON.parse(parsed);
                        for (const { delta } of choices) {
                            if (delta?.content) {
                                callback(delta.content);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            callback("Something went wrong, please contact dev team.");
        }
    }, [key, model])
}
