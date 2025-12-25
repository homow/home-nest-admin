import type {DropDownOptionsType, DropDownProps} from "@/types/ui";
import DropDownAccountOptions from "./DropDownOptionsMenu";
import useLogoutAction from "@/hooks/useLogoutAction";
import AccountInfo from "./AccountInfo";
import {cn} from "@/lib/ui-utils/ui-utils";
import {Activity} from "react";

export default function DropDownAccountMenu(
    {
        open,
        setOpen,
        className,
    }: DropDownProps
) {
    const {LogoutComponent, openLogoutModal} = useLogoutAction();

    // drop down options
    const dropDownAccountOptionsData: DropDownOptionsType[] = [
        {icon: "user", url: "/account", name: "اکانت"},
        {icon: "logout", name: "خروج", callback: openLogoutModal},
    ];

    return (
        <Activity
            mode={open ? "visible" : "hidden"}
        >
            <div
                className={
                    cn("w-58 mt-2 absolute top-full left-0 z-20 bg-main-bg py-2 rounded-md shadow-2xl",
                        className
                    )
                }
            >
                <AccountInfo
                    className={"pb-4 border-b border-disable-txt/50"}
                />

                <ul
                    className={cn(
                        "divide-y divide-disable-txt/30 pt-2 *:last:hover:bg-rose-600 *:last:active:bg-rose-600",
                        className
                    )}
                >
                    {dropDownAccountOptionsData.length > 0 &&
                        dropDownAccountOptionsData.map(
                            (data) => (
                                <DropDownAccountOptions
                                    key={data.name}
                                    dataLink={data}
                                    className={"pt-2"}
                                    setOpenMenu={setOpen}
                                />
                            )
                        )
                    }
                </ul>
                <LogoutComponent/>
            </div>
        </Activity>
    );
};