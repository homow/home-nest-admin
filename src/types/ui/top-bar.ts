import type {NoLimitArgsFn, UseToggleFn} from "./";

export interface DropDownOptionsType {
    icon: string;
    url?: string;
    name: string;
    callback?: NoLimitArgsFn;
}

export interface DropDownProps {
    className?: string;
    open: boolean;
    setOpen: UseToggleFn;
}

export interface DropDownAccountOptionsProps {
    className?: string;
    setOpenMenu?: UseToggleFn;
    dataLink: DropDownOptionsType;
}