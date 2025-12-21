"use client";

import {useEffect, useEffectEvent} from "react";
import useToggle from "@/hooks/useToggle";
import {cn} from "@/lib/utils/ui-utils";

export default function OnlineUi() {
    const {toggle: online, handleToggle: setOnline} = useToggle();

    const handleOnline = useEffectEvent(() => setOnline(true));
    const handleOffline = useEffectEvent(() => setOnline(false));

    useEffect(() => {
        setOnline(navigator.onLine);

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