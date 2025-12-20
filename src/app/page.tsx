"use client";

import {usePathname} from "next/navigation";

export default function Home() {
    const pathname: string = usePathname();
    console.log(pathname);

    return (
        <div>
            fuck
        </div>
    );
};