import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PopupDialog } from "./PopupDialog";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
var showing = false;
var blacklist: string[] = [];

chrome.storage.local.get(
    {
        blacklistDomain: [],
    },
    ({ blacklistDomain }) => {
        blacklist = blacklistDomain.map(({ value }: { value: string }) => value);
    },
);

document.addEventListener("mouseup", (e) => {
    const selection = window.getSelection();
    const text = selection?.toString()?.trim();
    const domain = window.location.hostname;
    if (!showing && selection && text && text.length > 0 && !blacklist.includes(domain)) {
        const dialogTop = `${e.clientY + window.scrollY + 5}px`;
        const dialogLeft = `${e.clientX + window.scrollX}px`;
        showing = true;
        root.render(
            <React.StrictMode>
                <PopupDialog
                    top={dialogTop}
                    left={dialogLeft}
                    selectedText={text}
                    selection={selection}
                />
            </React.StrictMode>,
        );
    } else {
        root.render(<React.StrictMode></React.StrictMode>);
        showing = false;
    }
});
