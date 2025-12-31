"use client";

import {create} from "zustand";
import {UserPublic} from "@/types/models";

interface UserStore {
    user: UserPublic | null;
    accessToken: string;

    getUser: (user: UserPublic) => void;
    setAccessToken: (accessToken: string) => void;
}

const useUserStore = create<UserStore>(
    (set) => ({
        user: null,
        accessToken: "",
        getUser: user => {
            set(() => {
                return {user};
            });
        },
        setAccessToken: (accessToken: string) => set(() => ({accessToken}))
    })
);

export default useUserStore;