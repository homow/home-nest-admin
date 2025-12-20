import type {DropDownOptionsType, DropDownProps} from "@/types/ui";
import DropDownAccountOptions from "./DropDownOptionsMenu";
import AccountAvatar from "../../common/AccounAvatar";
import Overlay from "@/components/ui/Overlay";
import {cn} from "@/lib/utils/ui-utils";
import {Activity} from "react";

export default function DropDownAccountMenu(
    {
        open,
        setOpen,
        className,
    }: DropDownProps
) {
    // drop down options
    const dropDownAccountOptionsData: DropDownOptionsType[] = [
        {icon: "user", url: "/account", name: "اکانت"},
        {icon: "logout", name: "خروج"},
    ];

    return (
        <Activity
            mode={open ? "visible" : "hidden"}
        >
            <div
                className={
                    cn("w-58 mt-2 absolute top-full left-0 z-20 bg-main-bg py-2  rounded-md shadow-2xl",
                        className
                    )
                }
            >
                {dropDownAccountOptionsData.length > 0 &&
                    dropDownAccountOptionsData.map(
                        (data) => (
                            <DropDownAccountOptions
                                key={data.name}
                                dataLink={data}
                                setOpenMenu={setOpen}
                            />
                        )
                    )
                }
            </div>
        </Activity>
    );
};