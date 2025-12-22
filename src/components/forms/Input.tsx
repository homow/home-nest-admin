"use client";

import type {InputPropsType} from "@/types/ui";
import {cn} from "@/lib/ui-utils";
import InputContent from "@/components/forms/InputContent";

export default function Input(
    {
        as,
        onChangeInput,
        onChangeTextArea,
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
        dir,
        inputRef,
        textAreaRef,
        cols,
        rows,
    }: InputPropsType
) {
    const styles: string = cn(
        "mt-1 block bg-primary-bg/40 w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-secondary-txt focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition resize-none",
        hasError && "border-rose-600 bg-rose-600/10",
        className,
    );

    if (as === "input") {
        return (
            <InputContent
                id={id}
                label={label}
                errorMsg={errorMsg}
                required={required}
                hasError={hasError}
                parentClassName={parentClassName}
            >
                <input
                    id={id}
                    dir={dir}
                    name={name}
                    ref={inputRef}
                    type={inputType}
                    className={styles}
                    onChange={onChangeInput}
                    placeholder={placeholder ?? ""}
                    autoComplete={autoComplete ?? "off"}
                    {...(inputType !== "file" && {value: value ?? ""})}
                />
                {children}
            </InputContent>
        );
    } else {
        return (
            <InputContent
                id={id}
                label={label}
                errorMsg={errorMsg}
                required={required}
                hasError={hasError}
                parentClassName={parentClassName}
            >
                <textarea
                    id={id}
                    dir={dir}
                    name={name}
                    cols={cols ?? 30}
                    rows={rows ?? 10}
                    ref={textAreaRef}
                    className={styles}
                    onChange={onChangeTextArea}
                    placeholder={placeholder ?? ""}
                    autoComplete={autoComplete ?? "off"}
                />
                {children}
            </InputContent>
        );
    }
};