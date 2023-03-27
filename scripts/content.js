var grammerCheck = null;
var googleTranslate = null;
var definition = null;

// Use dynamic import to import modules.
// https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension
(async () => {
    const completions = await import(
        chrome.runtime.getURL("scripts/completions.js")
    );
    grammerCheck = completions.grammerCheckbyChatGPT;
    definitionbyChatGPT = completions.definitionbyChatGPT;
    const translate = await import(chrome.runtime.getURL("scripts/translate.js"));
    googleTranslate = translate.googleTranslate;
})();

const iconId = "gpt-ex-icon";
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
    grammerCheckButton.innerText = "Grammer";
    grammerCheckButton.style.borderColor = "#BBBBBB";

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
    translateButton.innerText = "Translate";
    translateButton.style.borderColor = "#BBBBBB";

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

function createIcon(top, left, dialogTop, dialogLeft, selectText) {
    const container = document.createElement("div");
    container.id = iconId;
    container.classList.add(
        "cs-absolute",
        "cs-bg-white",
        "cs-shadow-lg",
        "cs-rounded-md",
        "cs-text-center",
        "cs-border",
        "cs-border-solid",
        "cs-cursor-pointer",
        "cs-text-sky-400"
    );
    container.style.width = "22px";
    container.style.height = "23px";
    container.style.top = `${top + window.scrollY + 5}px`;
    container.style.left = `${left + window.scrollX + 5}px`;
    container.style.zIndex = Number.MAX_SAFE_INTEGER;
    container.style.borderColor = "#BBBBBB";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("cs-h-full", "cs-w-full", "cs-text-sky-400", "cs-block");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute(
        "d",
        "M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
    );
    path.setAttribute("clip-rule", "evenodd");
    svg.appendChild(path);

    container.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    container.addEventListener("mouseup", (e) => {
        e.preventDefault();
        e.stopPropagation();
        createDialog(selectText, dialogTop, dialogLeft);
        removeIcon();
    });
    container.appendChild(svg);
    document.body.appendChild(container);
    return container;
}

function removeIcon() {
    const icon = document.getElementById(iconId);
    if (icon) {
        document.body.removeChild(icon);
    }
}

function removeDialog() {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        document.body.removeChild(dialog);
    }
}

function showIcon(e) {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (
        !document.getElementById(iconId) &&
        !document.getElementById(dialogId) &&
        text.length > 0 &&
        text.length < 300
    ) {
        const range = selection.getRangeAt(0);
        const dialogTop = `${range.getBoundingClientRect().bottom + window.scrollY + 5
            }px`;
        const dialogLeft = `${range.getBoundingClientRect().left + window.scrollX
            }px`;
        createIcon(e.clientY, e.clientX, dialogTop, dialogLeft, text);
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

function clickInIcon(e) {
    const rect = document.getElementById(iconId)?.getBoundingClientRect();
    if (!rect) return false;

    return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    );
}

document.addEventListener("mouseup", (e) => {
    showIcon(e);
});

document.addEventListener("mousedown", (e) => {
    if (!clickInDialog(e)) {
        removeDialog();
    }
    if (!clickInIcon(e)) {
        removeIcon();
    }
});
