import { useCallback, useEffect, useState } from "react";

interface responseData {
    sentences: Array<{ trans: string }>;
}

export function useGoogleTranslate() {
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        chrome.storage.local.get(
            {
                language: "en",
            },
            ({ language }) => {
                setLanguage(language);
            },
        );
    }, [setLanguage]);

    return useCallback(
        (text: string, callback: (result: string) => void) => {
            fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${language}&hl=en-US&dt=t&dt=bd&dj=1&source=icon&q=${encodeURIComponent(text)}`,
                {
                    method: "GET",
                },
            )
                .then((response) => response.json())
                .then((data: responseData) => {
                    const sentences = data.sentences.map(({ trans }) => trans);
                    callback(sentences.join(" "));
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
        [language],
    );
}
