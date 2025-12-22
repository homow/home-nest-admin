import type {MainComponentProps} from "@/types/ui/common";
import {ChangeEventHandler, RefObject} from "react";

export interface InitInputProps extends MainComponentProps {
    id: string;
    label: string;
    errorMsg?: string;
    required?: boolean;
    parentClassName?: string;
    hasError?: boolean | string;
}

interface BaseInputPropsType extends InitInputProps {
    value: string;
    name?: string;
    disabled?: boolean;
    placeholder: string;
    dir?: "rtl" | "ltr";
    autoComplete?: string;
}

interface TextAreaProps extends BaseInputPropsType {
    as: "textarea";
    inputType: string;
    inputRef?: RefObject<HTMLTextAreaElement>;
    onChangeInput?: ChangeEventHandler<HTMLTextAreaElement>;
    textAreaRef?: never;
    onChangeTextArea?: never;
    cols?: never;
    rows?: never;
}

interface DefualtInputProps extends BaseInputPropsType {
    as: "input";
    textAreaRef?: RefObject<HTMLInputElement>;
    onChangeTextArea?: ChangeEventHandler<HTMLInputElement>;
    inputRef?: never;
    inputType?: never;
    onChangeInput?: never;
    cols?: number;
    rows?: number;
}

export type InputPropsType = DefualtInputProps | TextAreaProps;