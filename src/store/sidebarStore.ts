"use client";

import type {UseToggleFn} from "@/types/ui";
import {create} from "zustand";

interface CollapsedState {
    collapsed: boolean;

    // actions
    setCollapsed: UseToggleFn;
}

const sidebarStore = create<CollapsedState>(
    (set) => ({
        collapsed: false,
        setCollapsed: () => {
            set(state => ({
                collapsed: !state.collapsed,
            }));
        },
    })
);

export default sidebarStore;