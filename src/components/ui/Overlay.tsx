import {cn} from "@/lib/utils/ui-utils/ui-utils";
import {OverlayProps} from "@/types/ui";

export default function Overlay(
    {
        flag,
        setFlag,
        z = "z-10",
        lock = false,
        blur = true,
        className,
    }: OverlayProps
) {
    if (!flag) return null;

    function clickHandler() {
        if (lock) return;
        if(setFlag) setFlag(false);
    }

    return (
        <div
            onClick={clickHandler}
            className={cn(
                "fixed inset-0 bg-black/60 w-full h-full",
                blur && "backdrop-blur-xs",
                className,
                z,
            )}
        />
    );
};