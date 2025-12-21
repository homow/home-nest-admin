"use client";

import Logo from "@/components/ui/Logo";
import {cn} from "@/lib/utils/ui-utils";
import Icon from "@/components/icon/Icon";
import useSidebarStore from "@/store/sidebarStore";
import {storageCollapsedMenu} from "@/lib/utils";

export default function SideBarHeader() {
    const {collapsed, setCollapsed} = useSidebarStore();

    function toggleCollapse() {
        const currentCollapsed: boolean = storageCollapsedMenu();
        setCollapsed(!currentCollapsed);
    }

    return (
        <div
            className={"relative flex items-center justify-between h-16"}
        >
            <Logo>
                <span
                    className={cn(
                        "font-medium",
                        collapsed && "hidden",
                    )}
                >
                    پنل مدیریت
                </span>
            </Logo>

            <div
                onClick={toggleCollapse}
                className={
                    cn(
                        "hidden md:flex items-center justify-center absolute -left-5.5 cursor-pointer -rotate-180 transition-all duration-500",
                        collapsed && "rotate-0"
                    )
                }
            >
                <Icon icon={"chevronDoubleRight"} className={"size-5"}/>
            </div>
        </div>
    );
};