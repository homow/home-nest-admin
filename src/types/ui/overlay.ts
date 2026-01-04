import type {UseToggleFn} from "@/types/ui/common";

type ZNumber = 0 | 10 | 20 | 30 | 40 | 50;
type ZIndex = `z-${ZNumber}`;

interface BaseOverlayProps {
    z?: ZIndex;
    flag: boolean;
    blur?: boolean;
    className?: string;
}

interface LockOverlayProps extends BaseOverlayProps {
    lock: boolean;
    setFlag?: never;
}

interface NormalOverlayProps extends BaseOverlayProps {
    lock?: never;
    setFlag: UseToggleFn;
}

export type OverlayProps = LockOverlayProps | NormalOverlayProps;