import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {PopupDialog} from './PopupDialog';

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
var showing = false

document.addEventListener("mouseup", (e) => {
    const selection = window.getSelection();
    const text = selection?.toString()?.trim();
    if (!showing && text && text.length > 0) {
        const dialogTop = `${e.clientY + window.scrollY + 5}px`;
        const dialogLeft = `${e.clientX + window.scrollX}px`;
        showing = true;
        root.render(
          <React.StrictMode>
            <PopupDialog top={dialogTop} left={dialogLeft} hide={false} />
          </React.StrictMode>
        );
    } else {
      root.render(
        <React.StrictMode>
          <PopupDialog hide={true} />
        </React.StrictMode>
      );
      showing = false;
    }
});
