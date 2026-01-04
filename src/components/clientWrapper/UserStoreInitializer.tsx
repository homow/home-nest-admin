"use client";

import {useEffect} from "react";
import useUserStore from "@/store/userStore";

interface Props {
    token?: string;
}

export default function UserStoreInitializer({token}: Props): null {
    const {setAccessToken} = useUserStore();

    useEffect((): void => {
        if (token) {
            setAccessToken(token);
        }
    }, [setAccessToken, token]);

    return null;
}