"use client";

import {Activity, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {cn} from "@/lib/ui-utils";
import {NoLimitArgsFn} from "@/types/ui";
import Icon from "@/components/icon/Icon";

type ZNumber = 0 | 10 | 20 | 30 | 40 | 50;

type ZIndex = `z-${ZNumber}`;

export interface Props {
    z?: ZIndex;
    title?: string;
    isOpen: boolean;
    message?: string;
    loading?: boolean;
    cancelText?: string;
    dangerMode?: boolean;
    confirmText?: string;
    onCancel?: NoLimitArgsFn;
    onConfirm?: NoLimitArgsFn;
    setIsOpen: (isOpen: boolean) => void;
}

function InnerConfirmModal(
    {
        isOpen,
        loading,
        onCancel,
        onConfirm,
        setIsOpen,
        z = "z-30",
        title = "تأیید",
        cancelText = "لغو",
        dangerMode = false,
        confirmText = "تأیید",
        message = "آیا مطمئن هستید؟",
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
        if (isOpen && buttonRef?.current) buttonRef.current.focus();

        function handler(event: KeyboardEvent) {
            if (event.key === "Escape") onCancel?.();
        }

        if (isOpen) window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        }
    }, [isOpen, onCancel]);

    return (
        <Activity
            mode={isOpen ? "visible" : "hidden"}
        >
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
                            type={"button"}
                            ref={buttonRef}
                            onClick={async () => {
                                await onConfirm?.();
                                setIsOpen(false);
                            }}
                            className={
                                cn(
                                    "cursor-pointer px-4 py-1.5 rounded-lg text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:ring-offset-white hover:brightness-110 disabled:pointer-events-none disabled:cursor-not-allowed",
                                    confirmBtnBg
                                )
                            }
                            disabled={loading}
                        >
                            {loading ? (
                                    <Icon
                                        icon={"loadingDoted"}
                                        className="animate-spin [animation-duration:2s]"
                                    />
                                )
                                : confirmText
                            }
                        </button>

                        <button
                            type={"button"}
                            onClick={() => {
                                onCancel?.();
                                setIsOpen(false);
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
        z = "z-30",
        loading,
        setIsOpen
    }: Props
) {
    return createPortal(
        <InnerConfirmModal
            isOpen={isOpen}
            message={message}
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmText={confirmText}
            cancelText={cancelText}
            dangerMode={dangerMode}
            z={z}
            loading={loading}
            setIsOpen={setIsOpen}
        />,
        document.body
    );
};