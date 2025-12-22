import type {NoLimitArgsFn} from "@/types/ui/common";
import type {ReactNode, RefObject} from "react";

type BaseProps = {
    loading?: boolean;
}

type BtnStylesType = "fill" | "outline" | "sharpL" | "sharpR" | "sharpBoth" | "sharpNone" | "primary";

interface ButtonPropsStyle extends BaseProps {
    btnStyle: BtnStylesType;
    className?: string;
    disabled?: boolean;
}

interface ButtonPrimaryProps extends BaseProps {
    rightIcon?: string;
    leftIcon?: string;
    children?: ReactNode;
    textStyle?: string;
}

type InitType = ButtonPropsStyle & ButtonPrimaryProps;

interface ButtonProps extends InitType {
    as: "button";
    buttonType?: "button" | "submit" | "reset";
    url?: never;
    onClick?: NoLimitArgsFn;
    btnRef?: RefObject<HTMLButtonElement | null>;
    linkRef?: never;
}

interface LinkProps extends InitType {
    as: "link" | "a";
    url: string;
    buttonType?: never;
    onClick?: never;
    linkRef?: RefObject<HTMLAnchorElement | null>;
    btnRef?: never;
}

type ButtonComponentProps = ButtonProps | LinkProps;

export type {
    ButtonComponentProps,
    ButtonPropsStyle,
    ButtonPrimaryProps,
    BtnStylesType,
};