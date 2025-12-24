import type {ChangeEventHandler, Dispatch, RefObject, SetStateAction} from "react";
import type {MainComponentProps} from "./common";

export interface InitInputProps extends MainComponentProps {
    id: string;
    label: string;
    required?: boolean;
    parentClassName?: string;
    hasError?: boolean | string;
}

interface BaseInputPropsType extends InitInputProps {
    value?: string;
    name: string;
    disabled?: boolean;
    placeholder: string;
    dir?: "rtl" | "ltr";
    autoComplete?: string;
}

interface TextAreaProps extends BaseInputPropsType {
    as: "textarea";
    cols?: number;
    rows?: number;
    textAreaRef?: RefObject<HTMLTextAreaElement | null>;
    onChangeTextArea?: ChangeEventHandler<HTMLTextAreaElement>;
    inputRef?: never;
    inputType?: never;
    onChangeInput?: never;
}

interface DefualtInputProps extends BaseInputPropsType {
    as: "input";
    inputType: string;
    inputRef?: RefObject<HTMLInputElement | null>;
    onChangeInput?: ChangeEventHandler<HTMLInputElement>;
    cols?: never;
    rows?: never;
    textAreaRef?: never;
    onChangeTextArea?: never;
}

export interface SelectBoxOptionsType {
    value: string;
    label: string;
    icon?: string;
}

export interface SelectBoxPropsType {
    label: string;
    options: SelectBoxOptionsType[];
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    className?: string;
    helperText?: string;
    hasError?: boolean;
    disabled?: boolean;
}

export type InputPropsType = DefualtInputProps | TextAreaProps;