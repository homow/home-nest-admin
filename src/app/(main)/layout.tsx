import type {MainComponentProps} from "@/types/ui";
import MainLayout from "@/components/layout/MainLayout";
import {ReactNode} from "react";

interface Props extends MainComponentProps {
    sidebar?: ReactNode;
    topbar?: ReactNode;
}

export default function Layout({children, sidebar, topbar}: Props) {
    return (
        <>
            {sidebar}
            <MainLayout>
                {topbar}
                {children}
            </MainLayout>
        </>
    );
};