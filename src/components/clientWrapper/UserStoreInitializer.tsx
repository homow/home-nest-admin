"use client";

import useUserStore from "@/store/userStore";
import {useEffect} from "react";

export default function UserStoreInitializer(token?: string) {
    const {setAccessToken} = useUserStore();
    
    useEffect(() => {
        if (token) {
            setAccessToken(token);
        }
    }, [setAccessToken, token]);
    
    return null;
}