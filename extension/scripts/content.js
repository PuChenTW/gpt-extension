var chatGptComplete = null;
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
    chatGptComplete = completions.chatGptComplete;
    const translate = await import(chrome.runtime.getURL("scripts/translate.js"));
    googleTranslate = translate.googleTranslate;
    const icons = await import(chrome.runtime.getURL("scripts/icons.js"));
    translateIcon = icons.translateIcon;
    checkIcon = icons.checkIcon;
    progressSpinIcon = icons.progressSpinIcon;
    ready = true;
})();

class Button {
    constructor(icon, color) {
        this.button = document.createElement("button");
        this.button.classList.add("cs-button", color);
        this.button.appendChild(icon);
        // Prevent the selection been cleared by mouse down.
        this.button.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    setOnMouseUp(onMouseUp) {
        this.button.addEventListener("mouseup", onMouseUp);
    }

    show() {
        this.button.style.display = "flex";
    }

    hide() {
        this.button.style.display = "none";
    }
}

class LoadingSpin {
    constructor() {
        this.spin = document.createElement("div");
        this.spin.classList.add("cs-items-center", "cs-justify-center", "cs-p-4x");
        this.spin.style.display = "none";

        const loadingText = document.createElement("div");
        loadingText.innerText = "Processing...";

        this.spin.append(progressSpinIcon);
        this.spin.appendChild(loadingText);
    }

    show() {
        this.spin.style.display = "flex";
    }

    hide() {
        this.spin.style.display = "none";
    }
}

class PopupDialog {
    constructor() {
        this.dialog = null;
        this.spin = null;
        this.grammerCheckButton = null;
        this.translateButton = null;
        this.buttonList = [];
        this.resultResult = null;
        this.selectText = "";
    }

    create() {
        this.dialog = document.createElement("div");
        this.dialog.id = "gpt-ex-dialog";
        this.dialog.style.display = "none";

        this.spin = new LoadingSpin();

        this.grammerCheckButton = new Button(checkIcon, "cs-bg-lime-500");
        this.translateButton = new Button(translateIcon, "cs-bg-cyan-500");
        this.buttonList = [this.grammerCheckButton, this.translateButton];

        const genOnMouseUp = (api) => {
            const btnOnMouseUp = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.buttonList.forEach((button) => button.hide());
                this.spin.show();
                this.moveDialogBySelectionRect();
            };

            const apiCallback = (data) => {
                this.spin.hide();
                this.setDialogInnerText(data);
                this.moveDialogBySelectionRect();
            };

            return (e) => {
                btnOnMouseUp(e);
                api(this.selectText.trim().replace(/\n/g, " "), apiCallback);
            };
        };

        this.grammerCheckButton.setOnMouseUp(genOnMouseUp(chatGptComplete));
        this.translateButton.setOnMouseUp(genOnMouseUp(googleTranslate));

        this.buttonList.forEach(({ button }) => this.dialog.appendChild(button));
        const resultContainer = document.createElement("div");
        resultContainer.id = "result-container";

        this.resultResult = document.createElement("div");

        this.tooltip = document.createElement("span");
        this.tooltip.classList.add("cs-tooltiptext");

        resultContainer.appendChild(this.tooltip);
        resultContainer.appendChild(this.resultResult);

        resultContainer.addEventListener("mouseover", () => {
            this.tooltip.innerText = "click to copy";
            this.tooltip.style.visibility = "visible";
        });

        resultContainer.addEventListener("mouseout", () => {
            this.tooltip.style.visibility = "hidden";
        });

        this.dialog.appendChild(this.spin.spin);
        this.dialog.appendChild(resultContainer);

        this.dialog.addEventListener("mouseup", (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(this.getDialogInnerText());
            this.tooltip.innerText = "copied";
        });

        document.body.appendChild(this.dialog);
    }

    setSelectText(text) {
        this.selectText = text;
    }

    setDialogInnerText(data) {
        this.resultResult.innerText += data;
    }

    getDialogInnerText() {
        return this.resultResult.innerText;
    }

    moveDialog(top, left) {
        this.dialog.style.top = top;
        this.dialog.style.left = left;
    }

    moveDialogBySelectionRect() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const { left, bottom, width, height } = range.getBoundingClientRect();
            // If width and height both are 0, the selection is empty.
            if (width !== 0 && height !== 0) {
                const { scrollX, scrollY } = window;
                const { offsetWidth } = this.dialog;
                const dialogTop = `${bottom + scrollY + 5}px`;
                const dialogLeft = `${left + scrollX + width / 2 - offsetWidth / 2}px`;
                this.moveDialog(dialogTop, dialogLeft);
            }
        }
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
        this.buttonList.forEach((btn) => btn.show());
        this.dialog.style.display = "flex";
        this.moveDialog(dialogTop, dialogLeft);
    }

    hide() {
        if (this.dialog !== null) {
            this.dialog.style.display = "none";
            this.selectText = "";
            this.resultResult.innerHTML = "";
            this.spin.hide();
        }
    }
}

const dialog = new PopupDialog();

document.addEventListener("mouseup", (e) => {
    if (dialog.isShowing()) {
        dialog.hide();
    } else {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        if (ready && !dialog.isShowing() && text.length > 0) {
            const dialogTop = `${e.clientY + window.scrollY + 5}px`;
            const dialogLeft = `${e.clientX + window.scrollX}px`;
            dialog.show(text, dialogTop, dialogLeft);
        }
    }
});
