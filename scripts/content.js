var grammerCheck = null;
var googleTranslate = null;
var definition = null;

(async () => {
    const completions = await import(chrome.runtime.getURL("scripts/completions.js"));
    grammerCheck = completions.grammerCheckbyChatGPT;
    definitionbyChatGPT = completions.definitionbyChatGPT;
    const translate = await import(chrome.runtime.getURL("scripts/translate.js"));
    googleTranslate = translate.googleTranslate;
})();

const iconId = "gpt-ex-icon";
const dialogId = "gpt-ex-dialog";
const progressSpinId = "gpt-ex-spin";

function setDialogInnerText(data) {
    const progressSpin = document.getElementById(progressSpinId)
    if (progressSpin) {
        progressSpin.style.display = "none";
    }

    const dialog = document.getElementById(dialogId)
    if (dialog) {
        dialog.classList.remove("p-4x");
        dialog.classList.add("p-8x");
        dialog.innerText = data.trim();
    }
}

function createDialog(selectText, dialogTop, dialogLeft) {
    const dialog = document.createElement("div");
    dialog.id = dialogId;
    dialog.classList.add(
        "p-4x", "max-w-sm", "bg-white", "rounded", "shadow-lg", "font-sans", "text-16x", "text-justify",
        "flex", "items-center", "absolute", "border", "border-solid", "text-slate-800"
    );
    dialog.style.zIndex = Number.MAX_SAFE_INTEGER;
    dialog.style.top = dialogTop;
    dialog.style.left = dialogLeft;
    dialog.style.borderColor = "#BBBBBB"


    const spin = document.createElement("div");
    spin.id = progressSpinId;
    spin.classList.add("items-center", "justify-center", "p-4x");
    spin.style.display = "none"

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.classList.add("animate-spin", "-ml-1", "mr-3", "h-5", "w-5", "text-black")

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.classList.add("opacity-25");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "10");
    circle.setAttribute("stroke", "currentColor");
    circle.setAttribute("stroke-width", "4");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("opacity-75")
    path.setAttribute("fill", "currentColor")
    path.setAttribute("d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")

    const innerText = document.createElement("div");
    innerText.innerText = "Processing..."

    svg.appendChild(circle)
    svg.appendChild(path)

    spin.append(svg)
    spin.appendChild(innerText)


    const grammerCheckButton = document.createElement("button");
    grammerCheckButton.classList.add(
        "p-4x", "mx-2x", "bg-lime-500", "rounded-md", "shadow-lg", "border", "border-solid", "border-slate-700", "text-white", "font-sans", "text-16x",
    );
    grammerCheckButton.innerText = "Grammer";
    grammerCheckButton.style.borderColor = "#BBBBBB"

    grammerCheckButton.addEventListener("mouseup", e => {
        e.stopPropagation()
        grammerCheckButton.style.display = "none";
        translateButton.style.display = "none";
        spin.style.display = "flex";
        grammerCheck(selectText.trim().replace(/\n/g, " "), setDialogInnerText)
    })


    const translateButton = document.createElement("button");
    translateButton.classList.add(
        "p-4x", "mx-2x", "bg-cyan-500", "rounded-md", "shadow-lg", "border", "border-solid", "border-slate-700", "text-white", "font-sans", "text-16x",
    );
    translateButton.innerText = "Translate";
    translateButton.style.borderColor = "#BBBBBB"

    translateButton.addEventListener("mouseup", e => {
        e.stopPropagation()
        grammerCheckButton.style.display = "none";
        translateButton.style.display = "none";
        spin.style.display = "flex";
        googleTranslate(selectText.trim().replace(/\n/g, " "), setDialogInnerText)
    })

    dialog.appendChild(grammerCheckButton)
    dialog.appendChild(translateButton)
    dialog.appendChild(spin)

    document.body.appendChild(dialog);

    return dialog;
}

function createIcon(top, left, dialogTop, dialogLeft, selectText) {
    const container = document.createElement("div");
    container.id = iconId;
    container.classList.add("absolute", "bg-white", "shadow-lg", "rounded-md", "text-center", "border", "border-solid")
    container.style.width = "22px";
    container.style.height = "23px";
    container.style.top = `${top + window.scrollY + 5}px`;
    container.style.left = `${left + window.scrollX + 5}px`;
    container.style.zIndex = Number.MAX_SAFE_INTEGER;
    container.style.borderColor = "#BBBBBB"


    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("h-full", "w-full", "text-sky-400")
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd")
    path.setAttribute("d", "M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z")
    path.setAttribute("clip-rule", "evenodd")
    svg.appendChild(path)

    container.addEventListener("mouseup", (e) => {
        e.stopPropagation();
        createDialog(selectText, dialogTop, dialogLeft);
        removeIcon();
    });
    container.appendChild(svg)
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

function showDialog(e) {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (
        !document.getElementById(iconId) &&
        !document.getElementById(dialogId) &&
        text.length > 0 && text.length < 250
    ) {
        const range = selection.getRangeAt(0);
        const dialogTop = `${range.getBoundingClientRect().bottom + window.scrollY + 5
            }px`;
        const dialogLeft = `${range.getBoundingClientRect().left + window.scrollX
            }px`;
        createIcon(e.clientY, e.clientX, dialogTop, dialogLeft, text);
    } else {
        removeIcon();
        if (e.target && e.target.id != dialogId) {
            removeDialog();
        }
    }
}

document.addEventListener("mouseup", (e) => {
    showDialog(e);
});
