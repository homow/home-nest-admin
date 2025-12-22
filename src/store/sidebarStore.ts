"use client";

import {create} from "zustand";
import type {UseToggleFn} from "@/types/ui";
import {applyCustomSpace} from "@/lib/ui-utils";

interface CollapsedState {
    collapsed: boolean;
    currentCollapsed: boolean;

    // actions
    setCollapsed: UseToggleFn;
    setCurrentCollapsed: (value: boolean) => void;
}

const useSidebarStore = create<CollapsedState>(
    (set) => ({
        collapsed: false,
        currentCollapsed: false,
        setCollapsed: value => {
            set(state => {
                const val: boolean = typeof value === "boolean" ? value : !state.collapsed;

                localStorage.setItem("collapsedMenu",
                    String(val)
                );

                const currentCollapsed: boolean = applyCustomSpace(val);

                return {
                    collapsed: val,
                    currentCollapsed,
                }
            });
        },
        setCurrentCollapsed: value => {
            set(() => {
                return {
                    currentCollapsed: value,
                }
            })
        }
    })
);

export default useSidebarStore;