"use client";

import {useEffect} from "react";
import sidebarStore from "@/store/sidebarStore";
import {applyCustomSpace} from "@/lib/utils";

export default function SidebarEffect() {
    const {collapsed, setCollapsed} = sidebarStore();

    useEffect(() => {
        setCollapsed(applyCustomSpace(collapsed));
        localStorage.setItem("collapsedMenu", String(collapsed));
    }, [collapsed, setCollapsed]);

    return null;
};