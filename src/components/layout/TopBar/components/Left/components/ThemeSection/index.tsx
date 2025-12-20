"use client";

import {useTheme} from "next-themes";
import Icon from "@/components/icon/Icon";
import useToggle from "@/hooks/useToggle";
import {useEffect} from "react";

export default function ThemeSection() {
    const {toggle, handleToggle} = useToggle();
    const {theme, setTheme, systemTheme} = useTheme();

    useEffect(() => {
        handleToggle(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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