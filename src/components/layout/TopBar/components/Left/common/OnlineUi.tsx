"use client";

import {useEffect} from "react";
import {cn} from "@/lib/utils/ui-utils";
import useToggle from "@/hooks/useToggle";

export default function OnlineUi() {
    const {toggle: online, handleToggle: setOnline} = useToggle();

    useEffect(() => {
        setOnline(navigator.onLine);

        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span
            className={cn(
                "absolute bottom-0 right-0 border-2 border-primary-bg rounded-full size-3",
                online ? "bg-emerald-500" : "bg-red-600"
            )}
        />
    );
};