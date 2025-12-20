import {cn} from "@/lib/utils/ui-utils";

type ZNumber = 0 | 10 | 20 | 30 | 40 | 50;
type ZIndex = `z-${ZNumber}`;

interface Props {
    z?: ZIndex;
    flag: boolean;
    lock?: boolean;
    blur?: boolean;
    className?: string;
    setFlag: (flag?: boolean) => void;
}

export default function Overlay(
    {
        flag,
        setFlag,
        z = "z-10",
        lock = false,
        blur = true,
        className,
    }: Props
) {
    if (!flag) return null;

    function clickHandler() {
        if (lock) return;
        setFlag(false);
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