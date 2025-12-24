'use client';

import type {BtnStylesType, MainComponentProps} from "@/types/ui";
import Button from "@/components/button/Button";
import {useFormStatus} from "react-dom";
import {Activity, MouseEvent} from "react";

interface Props extends MainComponentProps {
    disabled?: boolean;
    hasError?: string;
    btnStyle?: BtnStylesType;
}

export default function FormButton(
    {
        btnStyle,
        children,
        className,
        disabled,
        hasError,
    }: Props
) {
    const {pending} = useFormStatus();

    return (
        <>
            <Button
                as={"button"}
                loading={pending}
                disabled={disabled}
                buttonType={"submit"}
                className={className}
                btnStyle={btnStyle || "fill"}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    if (pending) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                }}
            >
                {children || "تایید"}
            </Button>

            <Activity
                mode={hasError ? "visible" : "hidden"}
            >
                <p className={"text-rose-500"}>
                    {hasError}
                </p>
            </Activity>
        </>
    );
};