'use client';

import {ErrorMessageInputs, RedStarField} from "@/components/ui/Fragments";
import type {InitInputProps} from "@/types/ui";
import {cn} from "@/lib/utils/ui-utils";

export default function InputContent(
    {
        parentClassName,
        id,
        children,
        hasError,
        label,
        required
    }: InitInputProps
) {
    return (
        <div>
            <div
                className={cn(parentClassName)}
            >
                <label
                    htmlFor={id}
                    className="flex flex-row gap-1 text-sm"
                >
                    {label}
                    {required && <RedStarField/>}
                </label>

                {children}
            </div>
            {hasError && (
                <ErrorMessageInputs
                    msg={typeof hasError === "string" ? hasError : "ارور موجوده"}
                />
            )}
        </div>
    );
};