"use client";

function applyCustomSpace(
    collapsed: boolean,
): boolean {
    if (window.innerWidth < 896) {
        document.documentElement.style.setProperty("--spacing-custom", "0px");
        return false;
    } else {
        document.documentElement.style.setProperty(
            "--spacing-custom",
            collapsed ? "80px" : "260px"
        );
        return collapsed;
    }
}

const storageCollapsed: boolean = localStorage.getItem("collapsedMenu") === "true";

export {storageCollapsed, applyCustomSpace};