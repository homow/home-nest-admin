"use client";

import {usePathname} from "next/navigation";

export default function useIsExactMatch(
    route: string,
    includesRoute?: boolean,
): boolean {
    const pathname: string = usePathname();
    if (includesRoute) return pathname.startsWith(route);
    return pathname === route;
};