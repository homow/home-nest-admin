import type {Metadata} from "next";

export default function Properties() {
    return (
        <section
            className={"main-components"}
        >
            ملک ها
        </section>
    );
};

export const metadata: Metadata = {
    title: `ملک ها ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
};