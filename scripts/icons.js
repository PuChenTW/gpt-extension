function createPath(d, attr, classList) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    for (const prop in attr) {
        path.setAttribute(prop, attr[prop]);
    }
    if (classList?.length ?? 0 > 0) {
        path.classList.add(...classList)
    }
    return path
}

function createIcon(children, attr, classList) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    for (const prop in attr) {
        svg.setAttribute(prop, attr[prop]);
    }
    if (classList?.length ?? 0 > 0) {
        svg.classList.add(...classList)
    }
    for (const child of children) {
        svg.appendChild(child);
    }

    return svg
}

const translatePath1 = createPath("M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545 19.381 19.381 0 017 9.56a19.418 19.418 0 01-1.002-2.05.75.75 0 00-1.384.577 20.935 20.935 0 001.492 2.91 19.613 19.613 0 01-3.828 4.154.75.75 0 10.945 1.164A21.116 21.116 0 007 12.331c.095.132.192.262.29.391a.75.75 0 001.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 002.333-5.332c.31.031.618.068.924.108a.75.75 0 00.198-1.487 32.832 32.832 0 00-3.599-.278V2.75z")
const translatePath2 = createPath(
    "M13 8a.75.75 0 01.671.415l4.25 8.5a.75.75 0 11-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 11-1.342-.67l4.25-8.5A.75.75 0 0113 8zm2.037 6.5L13 10.427 10.964 14.5h4.073z",
    { "fill-rule": "evenodd", "clap-rule": "evenodd" }
)
export const translateIcon = createIcon(
    [translatePath1, translatePath2],
    { viewBox: "0 0 20 20", fill: "currentColor" },
    ["cs-h-full", "cs-w-full", "cs-block", "cs-text-white"]
)

const checkPath = createPath(
    "M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zm10.857 5.691a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
    { "fill-rule": "evenodd", "clap-rule": "evenodd" }
)

export const checkIcon = createIcon(
    [checkPath],
    { viewBox: "0 0 20 20", fill: "currentColor" },
    ["cs-h-full", "cs-w-full", "cs-block", "cs-text-white"]
)

const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
);
circle.classList.add("cs-opacity-25");
circle.setAttribute("cx", "12");
circle.setAttribute("cy", "12");
circle.setAttribute("r", "10");
circle.setAttribute("stroke", "currentColor");
circle.setAttribute("stroke-width", "4");


const progressSpinPath = createPath(
    "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
    { fill: "currentColor" },
    ["cs-opacity-75"]
)

export const progressSpinIcon = createIcon(
    [circle, progressSpinPath],
    { viewBox: "0 0 24 24", fill: "none" },
    ["cs-animate-spin", "cs--ml-1", "cs-mr-3", "cs-h-5", "cs-w-5", "cs-text-black"]
)
