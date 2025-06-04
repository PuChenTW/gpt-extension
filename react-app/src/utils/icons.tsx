import React from "react";

export function TranslateIcon() {
    return (
        <svg
            className="cs-h-full cs-w-full cs-block cs-text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545 19.381 19.381 0 017 9.56a19.418 19.418 0 01-1.002-2.05.75.75 0 00-1.384.577 20.935 20.935 0 001.492 2.91 19.613 19.613 0 01-3.828 4.154.75.75 0 10.945 1.164A21.116 21.116 0 007 12.331c.095.132.192.262.29.391a.75.75 0 001.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 002.333-5.332c.31.031.618.068.924.108a.75.75 0 00.198-1.487 32.832 32.832 0 00-3.599-.278V2.75z" />
            <path
                fillRule="evenodd"
                d="M13 8a.75.75 0 01.671.415l4.25 8.5a.75.75 0 11-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 11-1.342-.67l4.25-8.5A.75.75 0 0113 8zm2.037 6.5L13 10.427 10.964 14.5h4.073z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function CheckIcon() {
    return (
        <svg
            className="cs-h-full cs-w-full cs-block cs-text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zm10.857 5.691a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function ProgressSpin() {
    return (
        <svg
            className="cs-animate-spin cs--ml-1 cs-mr-3 cs-h-5 cs-w-5 cs-text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle
                className="cs-opacity-25"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth={4}
                cx={12}
                cy={12}
                r={10}
            />
            <path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
                className="cs-opacity-75"
            />
        </svg>
    );
}

export function FillColorIcon() {
    return (
        <svg
            width="24"
            height="24"
            fill="#000000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 14c-.092.064-2 2.083-2 3.5 0 1.494.949 2.448 2 2.5.906.044 2-.891 2-2.5 0-1.5-1.908-3.436-2-3.5zM9.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586l7-7-.707-.707L11 4.586 8.707 2.293 7.293 3.707 9.586 6 4 11.586c-.378.378-.586.88-.586 1.414s.208 1.036.586 1.414L9.586 20zM11 7.414 16.586 13H5.414L11 7.414z" />
        </svg>
    );
}

export function TextColorIcon() {
    return (
        <svg
            fill="#000000"
            width="24"
            height="24"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19.47,3.84a1.45,1.45,0,0,0-1.4-1H18a1.45,1.45,0,0,0-1.42,1L8.42,21.56a1.35,1.35,0,0,0-.14.59,1,1,0,0,0,1,1,1.11,1.11,0,0,0,1.08-.77l2.08-4.65h11l2.08,4.59a1.24,1.24,0,0,0,1.12.83,1.08,1.08,0,0,0,1.08-1.08,1.59,1.59,0,0,0-.14-.57ZM13.36,15.71,18,5.49l4.6,10.22Z"></path>
            <rect x="4.06" y="25" width="28" height="8" rx="2" ry="2"></rect>
            <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
    );
}
