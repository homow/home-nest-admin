'use client';

import Link from "next/link";
import {cn} from "@/lib/utils/ui-utils/ui-utils";
import type {MainComponentProps} from "@/types/ui";
import useIsExactMatch from "@/hooks/useIsExactMatch";

interface Props extends MainComponentProps {
    url: string;
    title?: string;
    onClick?: () => void;
    isPrefetch?: boolean;
    activeStyle?: string;
    unActiveStyle?: string;
    isActiveIncludesRoute?: boolean;
}

export default function NavLinkClient(
    {
        url,
        title,
        onClick,
        children,
        className,
        activeStyle,
        unActiveStyle,
        isPrefetch = false,
        isActiveIncludesRoute = false,
    }: Props
) {
    const isActive: boolean = useIsExactMatch(url, isActiveIncludesRoute);

    return (
        <Link
            title={
                typeof children === "string" ? children : title
            }
            onClick={onClick}
            prefetch={isPrefetch}
            href={url}
            className={
                cn(
                    className,
                    isActive && activeStyle,
                    !isActive && unActiveStyle
                )
            }
        >
            {children}
        </Link>
    );
};