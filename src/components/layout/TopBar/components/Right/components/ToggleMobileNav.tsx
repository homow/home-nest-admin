"use client";

import useMobileNavStore from "@/store/mobileNavStore";
import Overlay from "@/components/ui/Overlay";
import Icon from "@/components/icon/Icon";

export default function OpenMobileNavMenu() {
    const {isOpenNav, setIsOpenNav} = useMobileNavStore();

    return (
        <>
            <Overlay
                flag={isOpenNav}
                setFlag={setIsOpenNav}
                z={"z-30"}
            />

            <span
                onClick={() => setIsOpenNav()}
                className={"cursor-pointer md:hidden"}
            >
                <Icon
                    className={"-scale-x-100"}
                    icon={"bars"}
                />
            </span>
        </>
    );
}