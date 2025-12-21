"use client";

import {ErrorMessageInputs, RedStarField} from "../ui/Fragments";
import type {ChangeEventHandler} from "react";
import {MainComponentProps} from "@/types/ui";
import {cn} from "@/lib/utils";

interface Props extends MainComponentProps {
    as: "input" | "textarea";
    id: string;
    label: string;
    value: string;
    name?: string;
    inputType: string;
    errorMsg?: string;
    required?: boolean;
    placeholder: string;
    autoComplete?: string;
    parentClassName?: string;
    hasError?: boolean | string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function Input(
    {
        as,
        onChange,
        name,
        inputType,
        id,
        label,
        autoComplete,
        value,
        placeholder,
        required,
        className,
        parentClassName,
        children,
        hasError,
        errorMsg,
    }: Props
) {
    const Component = as === "input" ? "input" : "textarea";

    return (
        <div>
            <div
                className={cn(
                    parentClassName
                )}
            >
                <label
                    htmlFor={id}
                    className="flex flex-row gap-1 text-sm"
                >
                    {label}
                    {required && <RedStarField/>}
                </label>
                <Component
                    {...(inputType !== "file" && {value: value ?? ""})}
                    onChange={onChange}
                    id={id}
                    name={name}
                    type={inputType}
                    autoComplete={autoComplete ?? "off"}
                    placeholder={placeholder ?? ""}
                    className={
                        cn(
                            "mt-1 block bg-primary-bg/40 w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-secondary-txt focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition",
                            hasError && "border-rose-600 bg-rose-600/10",
                            className,
                        )
                    }
                />
                {children}
            </div>
            {hasError && (
                <ErrorMessageInputs
                    msg={errorMsg}
                />
            )}
        </div>
    );
};