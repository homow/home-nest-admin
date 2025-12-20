"use client";

import {create} from "zustand";

const storageCollapsed: boolean = localStorage.getItem("collapsedMenu") === "true";

interface CollapsedState {
    collapsed: boolean;
    currentCollapsed: boolean;

    // actions
    setCollapsed: () => void;
    setCurrentCollapsed: () => void;
}

const useCounterStore = create<CollapsedState>(
    (set) => ({
        collapsed: storageCollapsed,
        currentCollapsed: false,
        setCollapsed: () => set((state) => ({collapsed: !state.collapsed})),
        setCurrentCollapsed: () => set((state) => ({currentCollapsed: !state.currentCollapsed})),
    })
);

export default useCounterStore;