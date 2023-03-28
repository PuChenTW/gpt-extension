function save_options({ target: { value: key } }) {
    chrome.storage.local.set({ key });
}

function changeModel({ target: { value: model } }) {
    chrome.storage.local.set({ model });
}

function restore_options() {
    chrome.storage.local.get(
        {
            key: "",
            model: "gpt-3.5-turbo",
        },
        ({ key, model }) => {
            document.getElementById("key").value = key;
            document.getElementById("model").value = model;
        }
    );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("key").addEventListener("input", save_options);
document.getElementById("model").addEventListener("change", changeModel);
