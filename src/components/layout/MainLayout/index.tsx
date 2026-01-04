import type {MainComponentProps} from "@/types/ui";

export default function MainLayout({children}: MainComponentProps) {
    return (
        <>
            {/* topBar and main content */}
            <section
                className={
                    "transition-all mr-custom flex-1 px-3 sm:px-6 flex flex-col"
                }
            >
                {/* main content */}
                <main
                    id="main"
                    className={
                        "@container/main relative h-full pb-5 space-y-6"
                    }
                >
                    {children}
                </main>
            </section>
        </>
    );
};