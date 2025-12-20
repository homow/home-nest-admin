import Logo from "@/components/ui/Logo";
import {cn} from "@/lib/utils/ui-utils";
import Icon from "@/components/ui/icon/Icon";

export default function SideBarHeader() {
    return (
        <div
            className={"relative flex items-center justify-between h-16"}
        >
            <Logo>
                <span
                    className={cn(
                        "font-medium",
                    )}
                >
                    پنل مدیریت
                </span>
            </Logo>

            <div
                className={
                    cn(
                        "hidden md:flex items-center justify-center absolute -left-5.5 cursor-pointer -rotate-180 transition-all duration-500"
                    )
                }
            >
                <Icon icon={"chevronDoubleRight"} className={"size-5"}/>
            </div>
        </div>
    );
};