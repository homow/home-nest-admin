"use client";

import useSidebarStore from "@/store/sidebarStore";
import {storageCollapsedMenu, applyCustomSpace} from "@/lib/ui-utils";
import {useEffect, useEffectEvent} from "react";

export default function SidebarEffect() {
    const {setCollapsed, collapsed, setCurrentCollapsed} = useSidebarStore();

    const handleResize = useEffectEvent(() => {
        setCurrentCollapsed(applyCustomSpace(collapsed));
    });

    useEffect(() => {
        const savedCollapsed: boolean = storageCollapsedMenu();
        setCollapsed(savedCollapsed);

        window.addEventListener("resize", handleResize);

        // cleanUp event
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        // eslint-disable-next-line
    }, []);

    return null;
};