"use client";

import {useEffect} from "react";
import useSidebarStore from "@/store/sidebarStore";
import {storageCollapsedMenu} from "@/lib/utils";

export default function SidebarEffect() {
    const {setCollapsed} = useSidebarStore();

    useEffect(() => {
        const collapsedStorage: boolean = storageCollapsedMenu();
        setCollapsed(collapsedStorage);
        // eslint-disable-next-line
    }, []);

    return null;
};