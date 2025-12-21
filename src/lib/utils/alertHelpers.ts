export type AlertModalType = "success" | "error" | "info" | "warning" | null | undefined;

export function getAlertModalBgHeader(alertType: AlertModalType): string {
    const map = {
        error: "text-rose-500",
        success: "text-emerald-500",
        warning: "text-amber-500",
        info: "text-sky-500"
    };
    return alertType ? map[alertType] : "text-gray-500 dark:text-gray-300";
}

export function getAlertModalBtnBg(alertType: AlertModalType): string {
    const map = {
        error: "bg-rose-500 hover:bg-rose-600",
        success: "bg-emerald-500 hover:bg-emerald-600",
        warning: "bg-amber-500 hover:bg-amber-600",
        info: "bg-sky-500 hover:bg-sky-600"
    };
    return alertType ? map[alertType] : "bg-gray-500 hover:bg-gray-600";
}

export function getAlertModalTitle(alertType: AlertModalType): string {
    const map = {
        error: "خطا",
        success: "موفقیت",
        warning: "هشدار",
        info: "اطلاع"
    };
    return alertType ? map[alertType] : "پیام";
}

export function getAlertModalBgBar(alertType: AlertModalType): string {
    const map = {
        error: "bg-rose-500",
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        info: "bg-sky-500"
    };
    return alertType ? map[alertType] : "bg-gray-500";
}