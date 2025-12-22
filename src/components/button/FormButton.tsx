'use client';

import Button from "@/components/button/Button";
import type {BtnStylesType, MainComponentProps} from "@/types/ui";
import {useFormStatus} from "react-dom";

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
        >
            {children || "تایید"}
        </Button>
    );
};