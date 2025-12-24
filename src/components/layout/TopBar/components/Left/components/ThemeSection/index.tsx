"use client";

import {useEffect, useState} from "react";
import Icon from "@/components/icon/Icon";
import {useTheme} from "next-themes";

export default function ThemeSection() {
    const [toggle, handleToggle] = useState<boolean>(false);
    const {theme, setTheme, systemTheme} = useTheme();

    useEffect(() => {
        queueMicrotask(() => {
            handleToggle(true);
        });
    }, []);

    if (!toggle) return null;

    const currentTheme: string | undefined = theme === "system" ? systemTheme : theme;

    if (!currentTheme) return null;

    return (
        <div
            onClick={() => {
                setTheme(
                    currentTheme === "dark" ? "light" : "dark"
                );
            }}
            className="flex justify-center items-center p-1 rounded-full cursor-pointer"
        >
            <Icon
                icon={currentTheme === "dark" ? "sun" : "moon"}
            />
        </div>
    );
};