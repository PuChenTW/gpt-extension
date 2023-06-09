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
        [children, setTooltip]
    );

    return (
        <div
            onMouseUp={onMouseUp}
            onMouseOut={onMouseOut}
            onMouseOver={onMouseOver}
            id="result-container"
        >
            <span
                style={{ visibility: showTooltip ? "visible" : "hidden" }}
                className="cs-tooltiptext"
            >
                {tooltip}
            </span>
            <div className="cs-flex"> {children} </div>
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
    const [hideButtons, setHideButtons] = useState(false);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState({ top, left });
    const chatGptComplete = useChatGptComplete()
    const googleTranslate = useGoogleTranslate()
    const [prompts] = usePrompts()

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

    const onButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setLoading(true);
        setHideButtons(true);
        moveDialogBySelectionRect();
        const apiCallback = (text: string) => {
            setLoading(false);
            setResult((previousResult) => previousResult + text);
        };
        return apiCallback
    }, [setLoading, setResult, setHideButtons, moveDialogBySelectionRect])

    const onGoogleTranslate = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const callback = onButtonClick(event)
        googleTranslate(selectedText, callback);
    }, [googleTranslate, selectedText, onButtonClick])

    const onChatGpt = useCallback((event: MouseEvent<HTMLButtonElement>, prompt: string) => {
        const callback = onButtonClick(event)
        const text = prompt.replace("{{text}}", selectedText)
        chatGptComplete(text, callback);
    }, [chatGptComplete, selectedText, onButtonClick])

    useEffect(() => {
        if (result) moveDialogBySelectionRect();
    }, [result]);

    return (
        <div id="gpt-ex-dialog" ref={containerRef} style={{ ...position }}>
            <TranslateButton
                onMouseUp={onGoogleTranslate}
                hide={hideButtons}
            />
            {prompts.map(({prompt, icon, bgcolor, color}, idx) => (
                <ChatGptButton
                    icon={icon}
                    bgcolor={bgcolor}
                    color={color}
                    key={idx}
                    onMouseUp={(e) => {onChatGpt(e, prompt)}}
                    hide={hideButtons}
                />
            ))}
            <LoadingSpin hide={!loading} />
            <ResultContainer>{result}</ResultContainer>
        </div>
    );
}
