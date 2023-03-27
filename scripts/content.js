var grammerCheck = null;
var googleTranslate = null;
var definition = null;
var translateIcon = null;
var checkIcon = null;

// Use dynamic import to import modules.
// https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension
(async () => {
    const completions = await import(chrome.runtime.getURL("scripts/completions.js"));
    grammerCheck = completions.grammerCheckbyChatGPT;
    definitionbyChatGPT = completions.definitionbyChatGPT;
    const translate = await import(chrome.runtime.getURL("scripts/translate.js"));
    googleTranslate = translate.googleTranslate;
    const icons = await import(chrome.runtime.getURL("scripts/icons.js"));
    translateIcon = icons.translateIcon;
    checkIcon = icons.checkIcon;
})();

const dialogId = "gpt-ex-dialog";
const progressSpinId = "gpt-ex-spin";

function setDialogInnerText(data) {
    const progressSpin = document.getElementById(progressSpinId);
    if (progressSpin) {
        progressSpin.style.display = "none";
    }

    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.innerHTML = data.trim();
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

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.classList.add(
        "cs-animate-spin",
        "cs--ml-1",
        "cs-mr-3",
        "cs-h-5",
        "cs-w-5",
        "cs-text-black"
    );

    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    circle.classList.add("cs-opacity-25");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "10");
    circle.setAttribute("stroke", "currentColor");
    circle.setAttribute("stroke-width", "4");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("cs-opacity-75");
    path.setAttribute("fill", "currentColor");
    path.setAttribute(
        "d",
        "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    );

    const innerText = document.createElement("div");
    innerText.innerText = "Processing...";

    svg.appendChild(circle);
    svg.appendChild(path);

    spin.append(svg);
    spin.appendChild(innerText);

    const grammerCheckButton = document.createElement("button");
    grammerCheckButton.classList.add(
        "cs-p-4x",
        "cs-mx-2x",
        "cs-bg-lime-500",
        "cs-rounded-md",
        "cs-shadow-lg",
        "cs-border",
        "cs-border-solid",
        "cs-border-slate-700",
        "cs-text-white",
        "cs-font-sans",
        "cs-text-14x",
        "cs-cursor-pointer"
    );
    grammerCheckButton.appendChild(checkIcon);
    grammerCheckButton.style.borderColor = "#BBBBBB";
    grammerCheckButton.style.width = "22px";
    grammerCheckButton.style.height = "23px";

    grammerCheckButton.addEventListener("mouseup", (e) => {
        e.preventDefault();
        e.stopPropagation();
        grammerCheckButton.style.display = "none";
        translateButton.style.display = "none";
        spin.style.display = "flex";
        grammerCheck(selectText.trim().replace(/\n/g, " "), setDialogInnerText);
    });

    const translateButton = document.createElement("button");
    translateButton.classList.add(
        "cs-p-4x",
        "cs-mx-2x",
        "cs-bg-cyan-500",
        "cs-rounded-md",
        "cs-shadow-lg",
        "cs-border",
        "cs-border-solid",
        "cs-border-slate-700",
        "cs-text-white",
        "cs-font-sans",
        "cs-text-14x",
        "cs-cursor-pointer"
    );
    translateButton.appendChild(translateIcon)
    translateButton.style.borderColor = "#BBBBBB";
    translateButton.style.width = "22px";
    translateButton.style.height = "23px";

    translateButton.addEventListener("mouseup", (e) => {
        e.preventDefault();
        e.stopPropagation();
        grammerCheckButton.style.display = "none";
        translateButton.style.display = "none";
        spin.style.display = "flex";
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
        const range = selection.getRangeAt(0);
        const dialogTop = `${range.getBoundingClientRect().bottom + window.scrollY + 5
            }px`;
        const dialogLeft = `${range.getBoundingClientRect().left + window.scrollX
            }px`;
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
