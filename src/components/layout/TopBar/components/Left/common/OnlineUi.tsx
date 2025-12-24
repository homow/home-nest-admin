"use client";

import {useEffect, useEffectEvent, useState} from "react";
import {cn} from "@/lib/ui-utils/ui-utils";

export default function OnlineUi() {
    const [online, setOnline] = useState<boolean>(false);

    const handleOnline = useEffectEvent(() => setOnline(true));
    const handleOffline = useEffectEvent(() => setOnline(false));

    useEffect(() => {
        queueMicrotask(() => {
            setOnline(navigator.onLine);
        });

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
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