export const applicationEndpoint = getApplicationEndpoint();

function getApplicationEndpoint() {
    if (typeof document === "undefined") return null;
    if (!document.currentScript) return ".";

    const src = document.currentScript.getAttribute("src") || "./";
    const match = /^(.*)\//.exec(src);
    if (!match) return ".";

    return match[1];
}
