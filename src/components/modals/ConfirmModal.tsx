"use client";

import {Activity, useEffect, useRef} from "react";
import {cn} from "@/lib/utils";

type ZNumber = 0 | 10 | 20 | 30 | 40 | 50

type ZIndex = `z-${ZNumber}`

interface Props {
    z?: ZIndex;
    isOpen: boolean;
    message: string;
    title?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    dangerMode?: boolean;
}

export default function ConfirmModal(
    {
        isOpen,
        message,
        title = "تأیید",
        onConfirm,
        onCancel,
        confirmText = "تأیید",
        cancelText = "لغو",
        dangerMode = false,
        z = "z-30"
    }: Props
) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const confirmBtnBg = dangerMode
        ? "bg-rose-600 hover:bg-rose-800"
        : "bg-emerald-600 hover:bg-emerald-800";

    const cancelBtnBg = dangerMode
        ? "bg-emerald-600 hover:bg-emerald-800"
        : "bg-rose-600 hover:bg-rose-800";

    const modalHeaderColor = dangerMode ? "text-rose-500" : "text-emerald-500";

    useEffect(() => {
        if (buttonRef?.current) buttonRef.current.focus();

        function handler(event: KeyboardEvent) {
            if (event.key === "Escape") onCancel?.();
        }

        if (isOpen) window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        }
    }, [isOpen, onCancel]);

    return (
        <Activity mode={isOpen ? "visible" : "hidden"}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-message"
                className={
                    cn(
                        "text-sm sm:text-base fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-md w-full flex items-center justify-center shadow-2xl",
                        z
                    )
                }
            >
                <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full p-6 space-y-6"
                >
                    <h3
                        className={cn(
                            "text-lg font-medium",
                            modalHeaderColor
                        )}
                    >
                        {title}
                    </h3>
                    <p
                        className="text-gray-700 dark:text-gray-300"
                    >
                        {message}
                    </p>
                    <div
                        className="flex justify-end gap-3"
                    >
                        <button
                            ref={buttonRef}
                            onClick={() => {
                                onConfirm?.();
                            }}
                            className={
                                cn(
                                    "cursor-pointer px-4 py-1.5 rounded-lg text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:ring-offset-white hover:brightness-110",
                                    confirmBtnBg
                                )
                            }
                        >
                            {confirmText}
                        </button>

                        <button
                            onClick={() => {
                                onCancel?.();
                            }}
                            className={cn(
                                "cursor-pointer px-4 py-1.5 rounded-lg text-white transition",
                                cancelBtnBg
                            )}
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </Activity>
    );
};