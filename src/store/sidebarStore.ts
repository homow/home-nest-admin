"use client";

import {create} from "zustand";
import {applyCustomSpace} from "@/lib/utils";

interface CollapsedState {
    collapsed: boolean;

    // actions
    setCollapsed: (value: boolean) => void;
}

const sidebarStore = create<CollapsedState>(
    (set) => ({
        collapsed: false,
        setCollapsed: (value: boolean) => {
            set(() => {
                localStorage.setItem("collapsedMenu",
                    String(value)
                );
                const collapsed: boolean = applyCustomSpace(value);
                return {
                    collapsed,
                }
            });
        },
    })
);

export default sidebarStore;