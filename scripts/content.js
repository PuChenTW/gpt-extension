var grammerCheck = null;
var googleTranslate = null;
var definition = null;
var translateIcon = null;
var checkIcon = null;
var progressSpinIcon = null;

// Use dynamic import to import modules.
// https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension
(async () => {
    const completions = await import(
        chrome.runtime.getURL("scripts/completions.js")
    );
    grammerCheck = completions.grammerCheckbyChatGPT;
    const translate = await import(chrome.runtime.getURL("scripts/translate.js"));
    googleTranslate = translate.googleTranslate;
    const icons = await import(chrome.runtime.getURL("scripts/icons.js"));
    translateIcon = icons.translateIcon;
    checkIcon = icons.checkIcon;
    progressSpinIcon = icons.progressSpinIcon;
})();

const dialogId = "gpt-ex-dialog";
const progressSpinId = "gpt-ex-spin";
const btnClass = [
    "cs-p-4x",
    "cs-mx-2x",
    "cs-rounded-md",
    "cs-shadow-lg",
    "cs-border",
    "cs-border-solid",
    "cs-border-slate-700",
    "cs-cursor-pointer",
];

function getSelectionRect() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
}

function moveDialogBySelectionRect() {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        const { left, bottom, width, height } = getSelectionRect();
        // If width and height both are 0, the selection is empty.
        if (width !== 0 && height !== 0) {
            dialog.style.top = `${bottom + window.scrollY + 5}px`;
            dialog.style.left = `${left + window.scrollX + width / 2 - dialog.offsetWidth / 2
                }px`;
        }
    }
}

function setDialogInnerText(data) {
    const progressSpin = document.getElementById(progressSpinId);
    if (progressSpin) {
        progressSpin.style.display = "none";
    }

    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.innerHTML += data.replace(/\n/g, "<br>");
        moveDialogBySelectionRect()
    }
}

function createDialog(selectText, dialogTop, dialogLeft) {
    const dialog = document.createElement("div");
    dialog.id = dialogId;
    dialog.classList.add(
        "cs-p-4x",
        "cs-max-w-sm",
        "cs-bg-white",
        "cs-rounded",
        "cs-shadow-lg",
        "cs-font-sans",
        "cs-text-14x",
        "cs-flex",
        "cs-items-center",
        "cs-absolute",
        "cs-border",
        "cs-border-solid",
        "cs-text-slate-800"
    );
    dialog.style.zIndex = Number.MAX_SAFE_INTEGER;
    dialog.style.top = dialogTop;
    dialog.style.left = dialogLeft;
    dialog.style.borderColor = "#BBBBBB";

    const spin = document.createElement("div");
    spin.id = progressSpinId;
    spin.classList.add("cs-items-center", "cs-justify-center", "cs-p-4x");
    spin.style.display = "none";

    const innerText = document.createElement("div");
    innerText.innerText = "Processing...";

    spin.append(progressSpinIcon);
    spin.appendChild(innerText);

    const grammerCheckButton = document.createElement("button");
    grammerCheckButton.classList.add(...btnClass, "cs-bg-lime-500");
    grammerCheckButton.appendChild(checkIcon);
    grammerCheckButton.style.borderColor = "#BBBBBB";
    grammerCheckButton.style.width = "22px";
    grammerCheckButton.style.height = "23px";

    const translateButton = document.createElement("button");
    translateButton.classList.add(...btnClass, "cs-bg-cyan-500");
    translateButton.appendChild(translateIcon);
    translateButton.style.borderColor = "#BBBBBB";
    translateButton.style.width = "22px";
    translateButton.style.height = "23px";

    const btnOnMouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        grammerCheckButton.style.display = "none";
        translateButton.style.display = "none";
        spin.style.display = "flex";
        moveDialogBySelectionRect()
    };

    grammerCheckButton.addEventListener("mouseup", (e) => {
        btnOnMouseUp(e);
        grammerCheck(selectText.trim().replace(/\n/g, " "), setDialogInnerText);
    });

    translateButton.addEventListener("mouseup", (e) => {
        btnOnMouseUp(e);
        googleTranslate(selectText.trim().replace(/\n/g, " "), setDialogInnerText);
    });

    if (selectText.split(" ").length - 1 > 1) {
        // If the selected text has less than 2 spaces, it probaily not a sentence.
        dialog.appendChild(grammerCheckButton);
    }
    dialog.appendChild(translateButton);
    dialog.appendChild(spin);

    document.body.appendChild(dialog);

    return dialog;
}

function removeDialog() {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        document.body.removeChild(dialog);
    }
}

function onMouseup(e) {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (
        !document.getElementById(dialogId) &&
        text.length > 0 &&
        text.length < 300
    ) {
        const dialogTop = `${e.clientY + window.scrollY + 5}px`;
        const dialogLeft = `${e.clientX + window.scrollX}px`;
        createDialog(text, dialogTop, dialogLeft);
    }
}

function clickInDialog(e) {
    const rect = document.getElementById(dialogId)?.getBoundingClientRect();
    if (!rect) return false;

    return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    );
}

document.addEventListener("mouseup", (e) => {
    onMouseup(e);
});

document.addEventListener("mousedown", (e) => {
    if (!clickInDialog(e)) {
        removeDialog();
    }
});
