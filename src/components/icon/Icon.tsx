import {cn} from "@/lib/utils/ui-utils/ui-utils";

interface Props {
    icon: string;
    className?: string;
    parentClassName?: string;
}

export default function Icon(
    {
        icon,
        className,
        parentClassName
    }: Props) {
    return (
        <span
            className={cn(
                "inline-block",
                parentClassName)}
        >
            <svg
                className={cn(
                    "size-6",
                    className)}
            >
                <use href={`#${icon}-icon`}></use>
            </svg>
        </span>
    );
};