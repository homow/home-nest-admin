"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/stores/sidebar";
import { applyCustomSpace } from "@/lib/utils";

export default function SidebarEffect() {
    const collapsed = useSidebarStore((s) => s.collapsed);

    useEffect(() => {
        applyCustomSpace(collapsed);
        localStorage.setItem("collapsedMenu", String(collapsed));
    }, [collapsed]);

    return null;
};