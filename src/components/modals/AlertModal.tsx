"use client";

import {
    Activity,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useRef,
    useState
} from "react";
import {
    getAlertModalBgHeader,
    getAlertModalBtnBg,
    getAlertModalTitle,
    getAlertModalBgBar,
    type AlertModalType
} from "@/lib/utils";
import {cn} from "@/lib/utils";

export interface SetDataTypes {
    alertType: AlertModalType;
    message?: string;
}

interface Props extends SetDataTypes {
    isOpen: boolean;
    setIsOpen: (value?: boolean) => void;
    setData: Dispatch<SetStateAction<SetDataTypes>>;
    closeDelay?: number;
}

export default function AlertModal(
    {
        message = "",
        alertType,
        isOpen = false,
        setIsOpen,
        setData,
        closeDelay = 5000
    }: Props
) {
    const [barWidth, setBarWidth] = useState(100)
    const buttonRef = useRef<HTMLButtonElement>(null);

    const bgHeader: string = getAlertModalBgHeader(alertType);
    const btnBg: string = getAlertModalBtnBg(alertType);
    const title: string = getAlertModalTitle(alertType);
    const bgBar: string = getAlertModalBgBar(alertType);

    // close with Escape
    useEffect(() => {
        // ESC key listener
        if (isOpen && buttonRef.current) buttonRef.current.focus();

        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }

        if (isOpen) window.addEventListener("keydown", handleKey);

        // cleanUp Event
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [isOpen, setIsOpen]);

    // progress bar and auto close
    useEffect(() => {
        if (!isOpen) return;

        let startTime: number;
        let animationFrame: number | null = null;

        function animate(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const elapsed: number = timestamp - startTime;
            const progress: number = Math.min(elapsed / closeDelay, 1);
            setBarWidth(100 - progress * 100);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setIsOpen(false);
                setData({alertType: null, message: ""});
            }
        }

        if (isOpen) {
            setTimeout(() => setBarWidth(100), 0);
            animationFrame = requestAnimationFrame(animate);
        } else {
            return;
        }

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isOpen, closeDelay, setIsOpen, setData]);

    return (
        <Activity
            mode={isOpen ? "visible" : "hidden"}
        >
            <div
                className={
                    cn(
                        "max-w-70 text-sm fixed top-0 right-0 w-full flex items-center overflow-hidden justify-center shadow-2xl z-30 xs:max-w-xs sm:text-base sm:max-w-sm",
                        isOpen ? "block" : "hidden"
                    )
                }
                role={"alertdialog"}
                aria-live={"assertive"}
                aria-modal={true}
                aria-labelledby={"alert-title"}
                aria-describedby={"alert-desc"}
            >
                <div
                    className={
                        "bg-white dark:bg-gray-800 shadow-xl w-full space-y-2 pt-3"
                    }
                >
                    <h3
                        className={cn(
                            "px-3 text-lg font-semibold",
                            bgHeader
                        )}
                    >
                        {title}
                    </h3>
                    <p
                        className={
                            "max-w-max text-gray-700 px-3 dark:text-gray-300"
                        }
                        aria-live={"assertive"}
                    >
                        {message}
                    </p>
                    <div
                        className="flex justify-end px-3"
                    >
                        <button
                            ref={buttonRef}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "cursor-pointer px-3 py-1 text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:ring-offset-white hover:brightness-110",
                                btnBg
                            )}
                        >
                            بستن
                        </button>
                    </div>

                    <div
                        dir={"ltr"}
                        className={"mt-3"}
                    >
                        <div
                            style={{
                                width: `${barWidth}%`,
                                transformOrigin: "left"
                            }}
                            className={cn(
                                "h-2",
                                bgBar
                            )}
                        ></div>
                    </div>
                </div>
            </div>
        </Activity>
    );
};