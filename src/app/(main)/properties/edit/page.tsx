import type {Metadata} from 'next';

export default function EditProperties() {
    return (
        <section
            className={"main-components"}
        >
            تغییر ملک ها
        </section>
    );
};

export const metadata: Metadata = {
    title: `تغییر ملک ها ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
};