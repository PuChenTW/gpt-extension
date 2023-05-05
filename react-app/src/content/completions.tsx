import { useCallback, useEffect, useState } from "react";

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
                            content: text,
                        },
                    ],
                    max_tokens: text.length + 150,
                    temperature: 0.2,
                    stream: true,
                }),
            });
    
            const reader = response?.body?.getReader();
            const decoder = new TextDecoder("utf-8");

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
                const data = decoder.decode(value);

                if (!response.ok) {
                    const { error } = JSON.parse(data);
                    callback(error?.message ?? "Something went wrong, please contact dev team.");
                    return
                }
    
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
