const DefaultPrompt = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;

function changeKey({ target: { value: key } }) {
    chrome.storage.local.set({ key });
}

function changeModel({ target: { value: model } }) {
    chrome.storage.local.set({ model });
}

function changePrompt({target: { textContent: prompt } }) {
    chrome.storage.local.set({ prompt });
}

function resetPrompt() {
    document.getElementById("prompt").textContent = DefaultPrompt;
    chrome.storage.local.set({ prompt: DefaultPrompt });
}

function changeLanguage({ target: { value: language } }) {
    chrome.storage.local.set({ language });
}

function restoreOptions() {
    chrome.storage.local.get(
        {
            key: "",
            model: "gpt-3.5-turbo",
            prompt: DefaultPrompt,
            language: "en"
        },
        ({ key, model, prompt, language }) => {
            document.getElementById("key").value = key;
            document.getElementById("model").value = model;
            document.getElementById("prompt").textContent = prompt;
            document.getElementById("language").value = language;
        }
    );
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("key").addEventListener("input", changeKey);
document.getElementById("model").addEventListener("change", changeModel);
document.getElementById("prompt").addEventListener("input", changePrompt);
document.getElementById("reset").addEventListener("click", resetPrompt);
document.getElementById("language").addEventListener("change", changeLanguage);
