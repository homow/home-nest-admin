"use client";

import useToggle from "@/hooks/useToggle";
import Overlay from "@/components/ui/Overlay";
import useScrollLock from "@/hooks/useScrollLock";
import AccountAvatar from "../../common/AccounAvatar";

export default function AccountMenu() {
    const {toggle, handleToggle} = useToggle();
    useScrollLock(toggle);

    return (
        <>
            <Overlay
                flag={toggle}
                setFlag={handleToggle}
            />

            <div
                className={"relative z-20"}
                onClick={() => handleToggle(true)}
            >
                <AccountAvatar className={"cursor-pointer"}/>
            </div>
        </>
    );
};