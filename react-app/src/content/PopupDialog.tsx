import React from "react";
import { useState, useCallback, MouseEvent, useEffect, useRef } from "react";
import { ProgressSpin } from "../utils/icons";
import { ChatGptButton, TranslateButton } from "./Button";
import { useGoogleTranslate } from "./translate";
import { useChatGptComplete } from "./completions";
import { usePrompts } from "../utils/promptsUtils";

interface dialogProps {
    top?: string;
    left?: string;
    selectedText?: string;
    selection?: Selection;
}

function LoadingSpin({ hide }: { hide: boolean }) {
    return (
        <div
            style={{ display: hide ? "none" : "flex" }}
            className="cs-items-center cs-justify-center cs-p-4x cs-flex"
        >
            <ProgressSpin />
            <div>Processing...</div>
        </div>
    );
}

function ResultContainer({ children }: { children: string }) {
    const [tooltip, setTooltip] = useState("click to copy");
    const [showTooltip, setShowTooltip] = useState(false);
    const [fontClass, setfontClass] = useState("cs-resizable cs-text-sm");
    const [width, setWidth] = useState(() => {
        const savedWidth = localStorage.getItem("resultContainerWidth");
        return savedWidth ? `${savedWidth}px` : "24rem";
    });

    const onResize = useCallback(() => {
        const container = document.getElementById("result-container");
        if (container) {
            const newWidth = container.offsetWidth;
            localStorage.setItem("resultContainerWidth", newWidth.toString());
            setWidth(`${newWidth}px`);
        }
    }, []);

    useEffect(() => {
        const container = document.getElementById("result-container");
        if (container) {
            const resizeObserver = new ResizeObserver(onResize);
            resizeObserver.observe(container);
            return () => resizeObserver.disconnect();
        }
    }, [onResize]);

    const onMouseOver = useCallback(() => {
        setTooltip("click to copy");
        setShowTooltip(true);
    }, [setTooltip, setShowTooltip]);

    const onMouseOut = useCallback(() => {
        setShowTooltip(false);
    }, [setShowTooltip]);

    const onMouseUp = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();
            navigator.clipboard.writeText(children);
            setTooltip("copied");
        },
        [children, setTooltip],
    );

    useEffect(() => {
        chrome.storage.local.get(
            {
                fontSize: "medium",
            },
            ({ fontSize }) => {
                switch (fontSize) {
                    case "small":
                        setfontClass("cs-text-xs");
                        break;
                    case "medium":
                        setfontClass("cs-text-sm");
                        break;
                    case "large":
                        setfontClass("cs-text-lg");
                        break;
                    default:
                        setfontClass("cs-text-sm");
                        break;
                }
            },
        );
    }, [setfontClass]);

    const containerClass = `cs-resizable ${fontClass}`;

    return (
        <div className="cs-flex cs-flex-col">
            <div
                onMouseUp={onMouseUp}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
                id="result-container"
                className={containerClass}
                style={{ width }}
            >
                <div className="cs-flex cs-p-2"> {children} </div>
            </div>
            <span
                style={{ visibility: showTooltip ? "visible" : "hidden" }}
                className="cs-tooltiptext"
            >
                {tooltip}
            </span>
        </div>
    );
}

export function PopupDialog({
    top = "0px",
    left = "0px",
    selectedText = "",
    selection,
}: dialogProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [result, setResult] = useState("");
    const [showingResult, setShowingResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState({ top, left });
    const chatGptComplete = useChatGptComplete();
    const googleTranslate = useGoogleTranslate();
    const [prompts] = usePrompts();
    const [hideTranslate, setHideTranslate] = useState(false);

    const moveDialogBySelectionRect = useCallback(() => {
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const { left, bottom, width, height } = range.getBoundingClientRect();
            // If width and height both are 0, the selection is empty.
            if (width !== 0 && height !== 0) {
                const { scrollX, scrollY } = window;
                const container = containerRef.current;
                const offsetWidth = container?.offsetWidth ?? 0;
                const dialogTop = `${bottom + scrollY + 5}px`;
                const dialogLeft = `${left + scrollX + width / 2 - offsetWidth / 2}px`;
                setPosition({ top: dialogTop, left: dialogLeft });
            }
        }
    }, [setPosition, containerRef, selection]);

    const onButtonClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();
            setLoading(true);
            setShowingResult(true);
            moveDialogBySelectionRect();
            const apiCallback = (text: string) => {
                setLoading(false);
                setResult((previousResult) => previousResult + text);
            };
            return apiCallback;
        },
        [setLoading, setResult, setShowingResult, moveDialogBySelectionRect],
    );

    const onGoogleTranslate = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            const callback = onButtonClick(event);
            googleTranslate(selectedText, callback);
        },
        [googleTranslate, selectedText, onButtonClick],
    );

    const onChatGpt = useCallback(
        (event: MouseEvent<HTMLButtonElement>, prompt: string) => {
            const callback = onButtonClick(event);
            const text = prompt.replace("{{text}}", selectedText);
            chatGptComplete(text, callback);
        },
        [chatGptComplete, selectedText, onButtonClick],
    );

    useEffect(() => {
        if (result) moveDialogBySelectionRect();
    }, [result, moveDialogBySelectionRect]);

    useEffect(() => {
        chrome.storage.local.get(
            {
                hideTranslate: false,
            },
            ({ hideTranslate }) => {
                setHideTranslate(hideTranslate);
            },
        );
    }, []);

    return (
        <div id="gpt-ex-dialog" ref={containerRef} style={{ ...position }}>
            {!hideTranslate && (
                <TranslateButton onMouseUp={onGoogleTranslate} hide={showingResult} />
            )}
            {prompts.map(({ prompt, icon, bgcolor, color }, idx) => (
                <ChatGptButton
                    icon={icon}
                    bgcolor={bgcolor}
                    color={color}
                    key={idx}
                    onMouseUp={(e) => {
                        onChatGpt(e, prompt);
                    }}
                    hide={showingResult}
                />
            ))}
            <LoadingSpin hide={!loading} />
            {showingResult && <ResultContainer>{result}</ResultContainer>}
        </div>
    );
}
