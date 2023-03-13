// Saves options to chrome.storage
function save_options() {
    console.log("test")
    const key = document.getElementById('key').value;
    chrome.storage.local.set({
        key: key,
    }, () => {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.style.visibility = "inherit";
        setTimeout(() => {
            status.style.visibility = "hidden";
        }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    console.log("test2")
    chrome.storage.local.get({
        key: '',
    }, ({ key }) => {
        document.getElementById('key').value = key;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);