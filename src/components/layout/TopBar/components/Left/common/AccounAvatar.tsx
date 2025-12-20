"use client";

import {cn} from "@/lib/utils/ui-utils";
import Image from "next/image";
import OnlineUi from "./OnlineUi";

interface Props {
    className?: string;
}

export default function AccountAvatar(
    {
        className,
    }: Props
) {
    return (
        <div
            className={cn(
                "relative size-10 rounded-full",
                className
            )}
        >
            <Image
                preload
                quality={80}
                width={80}
                height={80}
                alt="آواتار اکانت"
                className={"w-full"}
                src="/images/shared/Avatar.webp"
            />
            <OnlineUi/>
        </div>
    );
};