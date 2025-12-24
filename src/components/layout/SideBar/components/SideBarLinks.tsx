"use client";

import NavLinkClient from "@/components/ui/NavLinkClient";
import useSidebarStore from "@/store/sidebarStore";
import type {SideBarDataTypes} from "@/types/ui";
import {cn} from "@/lib/ui-utils/ui-utils";
import Icon from "@/components/icon/Icon";

interface Props {
    data: SideBarDataTypes;
}

export default function SideBarLinks({data}: Props) {
    const {currentCollapsed} = useSidebarStore();
    const {title, dataLinks} = data;

    return (
        <div>
            {/* title links */}
            <div
                className={cn(
                    "h-4.5 flex items-center gap-4",
                    currentCollapsed && "px-2"
                )}
            >
                {/* border */}
                <div
                    className={cn(
                        "w-10 h-px bg-disable-txt",
                        currentCollapsed ? "absolute hidden-effect" : "show-effect static"
                    )}
                />
                <p
                    className={cn(
                        "text-sm text-disable-txt",
                        currentCollapsed ? "absolute hidden-effect" : "show-effect static"
                    )}
                >
                    {title}
                </p>

                {/* border */}
                <div className="flex-1 h-px bg-disable-txt"/>
            </div>

            {/* list of links */}
            <ul
                className={"mt-3 space-y-1.5"}
            >
                {dataLinks.length > 0 && dataLinks.map(link => (
                    <li
                        title={link.text}
                        key={link.text}
                    >
                        <NavLinkClient
                            url={link.url}
                            isActiveIncludesRoute={
                                link.url !== "/"
                            }
                            className={"h-10.5 flex items-center pr-5.5 py-2 flex-row gap-3 w-full rounded-l-full hover:opacity-100"}
                            activeStyle={"grad-links"}
                            unActiveStyle={"hover:bg-violet-300 hover:text-gray-900  active:bg-violet-300 active:text-gray-900"}
                        >
                            {/* icon */}
                            <Icon icon={link.icon}/>

                            {/* text of link */}
                            <span
                                className={
                                    currentCollapsed
                                        ? "hidden-effect absolute"
                                        : "show-effect static"
                                }
                            >
                                {link.text}
                            </span>
                        </NavLinkClient>
                    </li>
                ))}
            </ul>
        </div>
    );
};