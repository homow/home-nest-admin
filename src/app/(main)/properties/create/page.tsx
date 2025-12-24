import type {Metadata} from 'next';

export default function CreateProperties() {
    return (
        <section
            className={"main-components"}
        >
            ساخت ملک جدید
        </section>
    );
};

export const metadata: Metadata = {
    title: `ساخت ملک جدید ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
};