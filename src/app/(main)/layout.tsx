import type {MainComponentProps} from "@/types/ui";
import MainLayout from "@/components/layout/MainLayout";

export default function Layout({children}: MainComponentProps) {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
};