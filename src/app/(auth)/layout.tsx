import type {MainComponentProps} from "@/types/ui";

export default function Layout({children}: MainComponentProps) {
    return (
        <section className="flex-1">
            {children}
        </section>
    );
};