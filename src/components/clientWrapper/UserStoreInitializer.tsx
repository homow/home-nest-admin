"use client";

import {useEffect} from "react";
import useUserStore from "@/store/userStore";

interface Props {
    token?: string;
}

export default function UserStoreInitializer({token}: Props) {
    const {setAccessToken} = useUserStore();

    useEffect(() => {
        console.log(token);
        if (token) {
            setAccessToken(token);
        }
    }, [setAccessToken, token]);

    return null;
}