"use client";

import {cn} from "@/lib/utils/ui-utils";
import SideBarMenu from "./components/SideBarMenu";
import SideBarHeader from "./components/SideBarHeader";
import SidebarEffect from "./components/SidebarEffect";
import useMobileNavStore from "@/store/mobileNavStore";

export default function SideBar() {
    const {isOpenNav} = useMobileNavStore();

    return (
        <aside
            id="side-bar"
            className={
                cn(
                    "fixed overflow-hidden top-0 pl-4.5 transition-all text-sm max-md:mobile-nav md:w-custom md:text-base",
                    isOpenNav ? "max-md:right-0" : "max-md:-right-58"
                )
            }
        >
            <SidebarEffect/>
            <SideBarHeader/>
            <SideBarMenu/>
        </aside>
    );
};