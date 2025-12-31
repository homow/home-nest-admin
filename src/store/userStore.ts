"use client";

import {create} from "zustand";
import {UserPublic} from "@/types/models";
import {devtools} from "zustand/middleware";

interface UserStore {
    user: UserPublic | null;
    accessToken: string;

    getUser: (user: UserPublic) => void;
    setAccessToken: (accessToken: string) => void;
}

const useUserStore = create(
    devtools<UserStore>((set) => ({
        user: null,
        accessToken: "",
        getUser: user => {
            set(() => {
                return {user};
            });
        },
        setAccessToken: (accessToken: string) => set(() => ({accessToken}))
    }), {
        name: "userStore",
        enabled: process.env.NODE_ENV !== "production"
    }),
);

export default useUserStore;