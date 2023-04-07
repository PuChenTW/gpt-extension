var authKey = "";
var chatModel = "gpt-3.5-turbo";

chrome.storage.local.get(
    {
        key: "",
        model: chatModel
    },
    ({ key, model }) => {
        authKey = key;
        chatModel = model;
    }
);

const statusMap = {
    401: "The requesting API key is not correct. Please set the correct API key in options page.",
    429: "The engine is currently overloaded. Retry your request later. If this issue persists, you might exceeded your current quota, please check your plan and billing details",
    500: "Server error. Retry your request later.",
};

export function grammerCheckbyChatGPT(text, callback) {
    fetch("https://api.openai.com/v1/chat/completions", {
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
                    content: `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n${text}\n"""`
                },
            ],
            max_tokens: text.length + 150,
            temperature: 0.2,
        }),
    })
        .then(async (response) => {
            if (response.status !== 200) {
                callback(
                    statusMap?.[response.status] ??
                    "Something went wrong, please contact dev team."
                );
            } else {
                const data = await response.json();
                let answer = data?.choices?.[0]?.message?.content.trim();
                if (answer.startsWith('"')) {
                    answer = answer.replace(/^"|"$/g, "");
                }
                callback(answer);
            }
        })
        .catch((error) => {
            console.error(error);
            callback("Something went wrong, please contact dev team.");
        });
}
