import type {MainComponentProps} from "@/types/ui";
import SvgDefs from "@/components/icon/SvgDefs";
// import Overlay from "@/components/ui/Overlay";
import SideBar from "../SideBar";
import TopBar from "../TopBar";

export default function MainLayout({children}: MainComponentProps) {
    return (
        <>
            <SvgDefs/>
            <SideBar/>

            {/*<Overlay*/}
            {/*    flag={}*/}
            {/*    setFlag={}*/}
            {/*    z={"z-30"}*/}
            {/*/>*/}

            <section
                className={
                    "transition-all mr-custom flex-1 px-3 sm:px-6 flex flex-col"
                }
            >
                {/* top bar | header */}
                <TopBar/>

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