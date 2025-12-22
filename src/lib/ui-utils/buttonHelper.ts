import {cn} from "@/lib/ui-utils";
import type {ButtonPropsStyle} from "@/types/ui";

export default function buttonStyle(
    {
        btnStyle,
        className,
        loading,
        disabled
    }: ButtonPropsStyle
): string {
    const outlineStyle = "border border-violet-600 text-violet-600 focus-visible:border-violet-700 focus-visible:text-violet-900 disabled:text-neutral-400 disabled:border-neutral-200 dark:disabled:border-neutral-600 dark:disabled:text-neutral-500";
    const segmentedStyle = "hover:border-violet-500 active:bg-violet-600 active:border-violet-600 active:text-white disabled:border-neutral-300 disabled:text-neutral-500";

    const buttonStyle: string = {
        fill: "bg-violet-600 text-white rounded-lg hover:bg-violet-700 active:bg-violet-900 focus-visible:bg-violet-700 disabled:bg-neutral-300 disabled:text-neutral-500 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-300",
        outline: `${outlineStyle} rounded-lg hover:border-violet-700 active:text-violet-900 active:border-violet-900`,
        sharpL: `${outlineStyle} ${segmentedStyle} rounded-r-lg`,
        sharpR: `${outlineStyle} ${segmentedStyle} rounded-l-lg`,
        sharpBoth: `${outlineStyle} ${segmentedStyle}`,
        sharpNone: `${outlineStyle} ${segmentedStyle} rounded-lg`,
        primary: "text-violet-600 hover:border-violet-700 active:text-violet-900 focus-visible:text-violet-700 disabled:text-neutral-400 dark:disabled:text-neutral-500"
    }[btnStyle];

    return cn(
        "flex items-center gap-2 h-10 text-center font-medium px-4 py-1.5 cursor-pointer transition-all outline-none md:h-11",
        buttonStyle,
        className,
        (loading || disabled)
        && "pointer-events-none"
    );
};