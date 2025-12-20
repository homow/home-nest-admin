import {ChildrenComponentProps} from "@/types/ui";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import SvgDefs from "@/components/ui/icon/SvgDefs";
// import Overlay from "@/components/ui/Overlay";

export default function MainLayout({children}: ChildrenComponentProps) {
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