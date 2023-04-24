var targetLanguage = "en";

chrome.storage.local.get(
    {
        language: "en",
    },
    ({ language }) => {
        targetLanguage = language;
    }
);

interface responseData {
    sentences: Array<{trans: string}>;
}

export function googleTranslate(text: string, callback: Function) {
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&hl=en-US&dt=t&dt=bd&dj=1&source=icon&q=${encodeURI(text)}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((data: responseData) => {
            const sentences = data.sentences.map(({trans}) => trans)
            callback(sentences.join(" "))
        }).catch(error => {
            console.error('Error:', error);
        });
}
