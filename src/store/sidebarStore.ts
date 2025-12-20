"use client";

import type {UseToggleFn} from "@/types/ui";
import {storageCollapsed} from "@/lib/utils";
import {create} from "zustand";

interface CollapsedState {
    collapsed: boolean;

    // actions
    setCollapsed: UseToggleFn;
}

const sidebarStore = create<CollapsedState>(
    (set) => ({
        collapsed: storageCollapsed,
        setCollapsed: () => {
            set(state => ({
                collapsed: !state.collapsed,
            }));
        },
    })
);

export default sidebarStore;