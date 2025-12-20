import type {MouseEvent} from 'react';
import type {
    NoLimitArgsFn,
    DropDownAccountOptionsProps
} from "@/types/ui";

import Link from "next/link";
import {cn} from "@/lib/utils/ui-utils";
import Icon from "@/components/icon/Icon";

export default function DropDownAccountOptions(
    {
        dataLink,
        className,
        setOpenMenu
    }: DropDownAccountOptionsProps
) {
    function onClickHandler(
        callback: NoLimitArgsFn | null
        , event: MouseEvent<HTMLElement>
    ) {
        event.stopPropagation();

        if (callback) {
            callback();
            return;
        }

        if (setOpenMenu) setOpenMenu(false);
    }

    return (
        <ul
            className={
                cn(
                    "divide-y divide-disable-txt/30 *:last:hover:bg-rose-600 *:last:active:bg-rose-600",
                    className
                )
            }
        >
            <li
                key={dataLink.name}
                className={
                    "w-full px-4 py-0.5 *:py-1.5 *:hover:opacity-100 hover:text-white hover:bg-violet-500 active:bg-violet-500 active:text-white *:active:text-white *:hover:text-white *:transition-all *:duration-300 *:rounded-md"
                }
            >
                {dataLink.url ? (
                    <Link
                        onClick={(event) => {
                            onClickHandler(null, event);
                        }}
                        href={`${dataLink.url}`}
                        className={
                            "w-full flex flex-row items-start gap-2"
                        }
                    >
                        <Icon
                            icon={dataLink.icon}
                            className={"size-5"}
                        />
                        {dataLink.name}
                    </Link>
                ) : (
                    <p
                        onClick={(event) => {
                            if (dataLink.callback) onClickHandler(dataLink.callback, event);
                        }}
                        className={
                            "flex flex-row items-center gap-2 cursor-pointer"
                        }
                    >
                        <Icon
                            icon={dataLink.icon}
                            className={"size-5"}
                        />
                        {dataLink.name}
                    </p>
                )}
            </li>
        </ul>
    );
};