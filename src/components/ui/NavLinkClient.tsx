'use client';

import type {ChildrenComponentProps} from "@/types/ui"
import useIsExactMatch from "@/hooks/useIsExactMatch";
import Link from "next/link";
import {cn} from "@/lib/utils/ui-utils";

interface Props extends ChildrenComponentProps {
    url: string;
    onClick?: () => void;
    isPrefetch?: boolean;
    className?: string;
    activeStyle?: string;
    unActiveStyle?: string;
    isActiveIncludesRoute?: boolean;
}

export default function NavLinkClient(
    {
        url,
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