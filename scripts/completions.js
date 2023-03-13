var authKey = ""

chrome.storage.local.get({
    key: '',
}, ({ key }) => {
    authKey = key;
});

export function grammerCheckbyChatGPT(text, callback) {
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authKey}`
        },
        body: JSON.stringify({
            'model': 'gpt-3.5-turbo-0301',
            'messages': [
                { "role": "system", "content": "You are a grammar checker. Give user the correct sentences and suggestions." },
                { "role": "user", "content": `Please help me to confirm the grammar of the following sentences: ${text}` }
            ],
            'max_tokens': 300,
        })
    })
        .then(response => response.json())
        .then(data => {
            callback(data["choices"][0]["message"]["content"])
        }).catch(error => {
            console.error('Error:', error);
        });
}

