import type {ReactNode} from "react";

export type MainComponentProps =  Readonly<{
    children?: ReactNode;
    className?: string;
}>;

export type NoLimitArgsFn = (...args: unknown[]) => unknown;
export type UseToggleFn = (value?: boolean) => void;