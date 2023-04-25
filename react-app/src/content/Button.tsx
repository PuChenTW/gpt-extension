import { MouseEvent } from "react";

import { TranslateIcon, CheckIcon } from "./icons";

interface buttonProps {
    children?: JSX.Element;
    hide: boolean;
    className?: string;
    onMouseUp: (event: MouseEvent<HTMLButtonElement>) => void;
};

function Button({ children, className, onMouseUp, hide = false }: buttonProps) {
    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const style: { display: string } = { display: hide ? "none" : "flex" };
    const btnClassName = className ? `cs-button ${className}` : "cs-button"

    return (
        <button
            className={btnClassName}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={style}
        >
            {children}
        </button>
    );
}

export function TranslateButton({ onMouseUp, hide = false }: buttonProps) {
    return (
        <Button onMouseUp={onMouseUp} className="cs-bg-cyan-500" hide={hide}>
            <TranslateIcon />
        </Button>
    );
}

export function ChatGptButton({ onMouseUp, hide = false }: buttonProps) {
    return (
        <Button onMouseUp={onMouseUp} className="cs-bg-lime-500" hide={hide}>
            <CheckIcon />
        </Button>
    );
}
