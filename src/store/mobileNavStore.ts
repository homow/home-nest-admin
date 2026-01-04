"use client";

import type {UseToggleFn} from "@/types/ui";
import {create} from "zustand";

interface MobileNavState {
    isOpenNav: boolean;
    setIsOpenNav: UseToggleFn;
}

const useMobileNavStore = create<MobileNavState>(
    (set) => ({
        isOpenNav: false,
        setIsOpenNav: () => set(state => ({
            isOpenNav: !state.isOpenNav
        }))
    })
);

export default useMobileNavStore;