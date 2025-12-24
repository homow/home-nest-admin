'use client';

import type {BtnStylesType, MainComponentProps} from "@/types/ui";
import Button from "@/components/button/Button";
import {useFormStatus} from "react-dom";
import type {MouseEvent} from "react";

interface Props extends MainComponentProps {
    btnStyle?: BtnStylesType;
    disabled?: boolean;
}

export default function FormButton(
    {
        btnStyle,
        children,
        className,
        disabled,
    }: Props
) {
    const {pending} = useFormStatus();

    return (
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
    );
};