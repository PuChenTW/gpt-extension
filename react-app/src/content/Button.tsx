import { MouseEvent } from "react";

import { TranslateIcon, CheckIcon } from "../utils/icons";

interface buttonProps {
    children?: JSX.Element | string;
    hide: boolean;
    className?: string;
    icon?: string;
    bgcolor?: string;
    color?: string;
    onMouseUp: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
    children,
    className,
    onMouseUp,
    bgcolor,
    color,
    hide = false,
}: buttonProps) {
    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const style: { display: string, backgroundColor: string, color : string } = {
        display: hide ? "none" : "flex",
        backgroundColor: bgcolor ?? "none",
        color: color ?? "#000000",
    };
    const btnClassName = className ? `cs-button ${className}` : "cs-button";

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

export function ChatGptButton({
    onMouseUp,
    icon,
    bgcolor,
    color,
    hide = false,
}: buttonProps) {
    return (
        <Button
            onMouseUp={onMouseUp}
            bgcolor={bgcolor}
            color={color}
            hide={hide}
        >
            {icon ?? <CheckIcon />}
        </Button>
    );
}
