import {cn} from "@/lib/utils";
import {RefObject} from "react";

interface Props {
    id?: string;
    name?: string;
    label?: string;
    checked: boolean;
    className?: string;
    ref?: RefObject<HTMLInputElement>;
}

export default function CheckBox(
    {
        ref,
        name,
        className,
        id = "checkbox",
        label = "انتخاب کن",
    }: Props
) {
    return (
        <label
            htmlFor={id}
            className={
                cn(
                    "flex items-center gap-2 cursor-pointer text-sm",
                    className
                )
            }
        >
            <input
                name={name}
                ref={ref}
                id={id}
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-gray-400 appearance-none checked:bg-violet-500 checked:border-violet-600 cursor-pointer"
            />
            <span>{label}</span>
        </label>
    );
};