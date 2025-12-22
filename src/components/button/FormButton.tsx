'use client';

import Button from "@/components/button/Button";
import type {BtnStylesType, MainComponentProps} from "@/types/ui";
import {useFormStatus} from "react-dom";

interface Props extends MainComponentProps {
    btnStyle?: BtnStylesType;
}

export default function FormButton(
    {
        btnStyle,
        children,
        className
    }: Props
) {
    const {pending} = useFormStatus();

    return (
        <Button
            as={"button"}
            loading={pending}
            buttonType={"submit"}
            className={className}
            btnStyle={btnStyle || "fill"}
        >
            {children || "تایید"}
        </Button>
    );
};