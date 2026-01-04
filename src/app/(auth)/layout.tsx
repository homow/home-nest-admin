import {ReactNode} from "react";
import type {MainComponentProps} from "@/types/ui";

interface Props extends MainComponentProps {
    topbar?: ReactNode;
}

export default function Layout({children, topbar}: Props) {
    return (
        <section
            className="flex-1 flex flex-col"
        >
            <header
                 className={
                     "flex flex-row p-4 bg-main-bg"
                 }
            >
                {topbar}
            </header>

            {children}
        </section>
    );
};