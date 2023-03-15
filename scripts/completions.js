var authKey = "";

chrome.storage.local.get(
    {
        key: "",
    },
    ({ key }) => {
        authKey = key;
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
            model: "gpt-3.5-turbo-0301",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a grammar checker. If the sentences have some error, give the user the correct sentences directly. Otherwise, just tell the user the grammar of the sentences is correct.",
                },
                { role: "user", content: `"${text}"` },
            ],
            max_tokens: text.length + 150,
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
                callback(data?.choices?.[0]?.message?.content.trim().replace(/^"|"$/g, ""));
            }
        })
        .catch((error) => {
            console.error(error);
            callback("Something went wrong, please contact dev team.");
        });
}
