import PropertiesLink from "./components/PropertiesLink";
import type {MainComponentProps} from "@/types/ui";

export default function Layout(
    {
        children,
    }:MainComponentProps
) {
    return (
        <>
            <section
                className={"main-components"}
            >
                <PropertiesLink/>
            </section>

            {children}
        </>
    );
};