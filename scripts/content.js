var grammerCheck = null;
var googleTranslate = null;
var definition = null;
var translateIcon = null;
var checkIcon = null;
var progressSpinIcon = null;
var ready = false;

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
    ready = true;
})();

class Dialog {
    constructor() {
        this.dialog = null;
        this.grammerCheckButton = null;
        this.translateButton = null;
        this.resultContainer = null;
        this.selectText = "";
    }

    create() {
        this.dialog = document.createElement("div");
        this.dialog.id = "gpt-ex-dialog";
        this.dialog.style.display = "none";

        this.spin = document.createElement("div");
        this.spin.classList.add("cs-items-center", "cs-justify-center", "cs-p-4x");
        this.spin.style.display = "none";

        const innerText = document.createElement("div");
        innerText.innerText = "Processing...";

        this.spin.append(progressSpinIcon);
        this.spin.appendChild(innerText);

        this.grammerCheckButton = document.createElement("button");
        this.grammerCheckButton.classList.add("button", "cs-bg-lime-500");
        this.grammerCheckButton.appendChild(checkIcon);

        this.translateButton = document.createElement("button");
        this.translateButton.classList.add("button", "cs-bg-cyan-500");
        this.translateButton.appendChild(translateIcon);

        const btnOnMouseUp = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.grammerCheckButton.style.display = "none";
            this.translateButton.style.display = "none";
            this.spin.style.display = "flex";
            this.moveDialogBySelectionRect();
        };

        const callback = (data) => {
            this.removeProgressSpin();
            this.setDialogInnerText(data);
            this.moveDialogBySelectionRect();
        };

        this.grammerCheckButton.addEventListener("mouseup", (e) => {
            btnOnMouseUp(e);
            grammerCheck(this.selectText.trim().replace(/\n/g, " "), callback);
        });

        this.translateButton.addEventListener("mouseup", (e) => {
            btnOnMouseUp(e);
            googleTranslate(this.selectText.trim().replace(/\n/g, " "), callback);
        });

        this.resultContainer = document.createElement("div");

        this.dialog.appendChild(this.grammerCheckButton);
        this.dialog.appendChild(this.translateButton);
        this.dialog.appendChild(this.spin);
        this.dialog.appendChild(this.resultContainer);
        document.body.appendChild(this.dialog);
    }

    setSelectText(text) {
        this.selectText = text;
    }

    removeProgressSpin() {
        this.spin.style.display = "none";
    }

    setDialogInnerText(data) {
        this.resultContainer.innerHTML += data.replace(/\n/g, "<br>");
    }

    moveDialog(top, left) {
        this.dialog.style.top = top;
        this.dialog.style.left = left;
    }

    moveDialogBySelectionRect() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const { left, bottom, width, height } = range.getBoundingClientRect();
        // If width and height both are 0, the selection is empty.
        if (width !== 0 && height !== 0) {
            const dialogTop = `${bottom + window.scrollY + 5}px`;
            const dialogLeft = `${left + window.scrollX + width / 2 - this.dialog.offsetWidth / 2
                }px`;
            this.moveDialog(dialogTop, dialogLeft);
        }
    }

    clickInDialog(e) {
        const rect = this.dialog.getBoundingClientRect();
        if (!rect) return false;

        return (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );
    }

    isShowing() {
        return this.dialog !== null && this.dialog.style.display === "flex";
    }

    show(text, dialogTop, dialogLeft) {
        this.selectText = text;
        // We need to wait for the asyncronous import to complete.
        // So instead of creating the dialog in constructor, we create it here.
        if (this.dialog === null) {
            dialog.create();
        }
        // If the selected text has less than 2 spaces, it probaily not a sentence.
        this.grammerCheckButton.style.display = this.selectText.split(" ").length - 1 > 1 ? "flex" : "none";
        this.translateButton.style.display = "flex";
        this.dialog.style.display = "flex";
        this.moveDialog(dialogTop, dialogLeft);
    }

    hide() {
        if (this.dialog !== null) {
            this.dialog.style.display = "none";
            this.selectText = "";
            this.resultContainer.innerHTML = "";
        }
    }
}

const dialog = new Dialog();

document.addEventListener("mouseup", (e) => {
    if (dialog.isShowing() && !dialog.clickInDialog(e)) {
        dialog.hide();
        return;
    }

    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (ready && !dialog.isShowing() && text.length > 0 && text.length < 300) {
        const dialogTop = `${e.clientY + window.scrollY + 5}px`;
        const dialogLeft = `${e.clientX + window.scrollX}px`;
        dialog.show(text, dialogTop, dialogLeft);
    }
});
