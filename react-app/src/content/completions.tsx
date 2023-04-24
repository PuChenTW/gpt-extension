var authKey = "";
var chatModel = "gpt-3.5-turbo";
var msgPrompt = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;

chrome.storage.local.get(
    {
        key: "",
        model: chatModel,
        prompt: msgPrompt,
    },
    ({ key, model, prompt }) => {
        authKey = key;
        chatModel = model;
        msgPrompt = prompt;
    }
);

const statusMap = {
    401: "The requesting API key is not correct. Please set the correct API key in options page.",
    429: "The engine is currently overloaded. Retry your request later. If this issue persists, you might exceeded your current quota, please check your plan and billing details",
    500: "Server error. Retry your request later.",
};

export async function chatGptComplete(text: string, callback: Function) {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authKey}`,
            },
            body: JSON.stringify({
                model: chatModel,
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
}
