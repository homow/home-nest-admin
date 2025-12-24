import type {ReactNode, RefObject, MouseEvent} from "react";
import type {NoLimitArgsFn} from "@/types/ui/common";

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
    onClick?: NoLimitArgsFn | ((event: MouseEvent<HTMLButtonElement>) => void);
    btnRef?: RefObject<HTMLButtonElement | null>;
    linkRef?: never;
    hasError?: string;
}

interface LinkProps extends InitType {
    as: "link" | "a";
    url: string;
    buttonType?: never;
    onClick?: never;
    linkRef?: RefObject<HTMLAnchorElement | null>;
    btnRef?: never;
    hasError?: never;
}

type ButtonComponentProps = ButtonProps | LinkProps;

export type {
    ButtonComponentProps,
    ButtonPropsStyle,
    ButtonPrimaryProps,
    BtnStylesType,
};