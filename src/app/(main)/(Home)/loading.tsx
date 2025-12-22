import {cn} from "@/lib/ui-utils";

type Props = {
    msg?: string;
    className?: string;
}

export default function loading(
    {
        msg = "لطفاً صبر کنید...",
        className,
    }: Props
) {
    return (
        <div
            className={cn(
                "flex-1 flex items-center justify-center h-full",
                className
            )}
            role="status"
            aria-live="polite"
        >
            <div
                className="flex flex-col items-center gap-4"
            >
                {/* Spinner */}
                <div
                    className="size-16 border-4 border-t-violet-500 border-gray-300 rounded-full animate-spin xl:size-20 xl:border-8"
                />
                {/* Message */}
                <p
                    className="text-lg font-medium xl:text-2xl"
                >
                    {msg}
                </p>
            </div>
        </div>
    );
};