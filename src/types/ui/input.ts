import type {MainComponentProps} from "@/types/ui/common";
import {ChangeEventHandler, RefObject} from "react";

interface BaseInputPropsType extends MainComponentProps {
    id: string;
    label: string;
    value: string;
    name?: string;
    inputType: string;
    errorMsg?: string;
    required?: boolean;
    placeholder: string;
    dir?: "rtl" | "ltr";
    autoComplete?: string;
    parentClassName?: string;
    hasError?: boolean | string;
}

interface TextAreaProps extends BaseInputPropsType {
    as: "textarea";
    ref?: RefObject<HTMLTextAreaElement>;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

interface DefualtInputProps extends BaseInputPropsType {
    as: "input";
    ref?: RefObject<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export type InputPropsType = DefualtInputProps | TextAreaProps;