import type {Metadata} from 'next';
import CreatePropertyForm from "./components/CreatePropertyForm";

export default function CreateProperties() {
    return (
        <section
            className={"main-components"}
        >
            <CreatePropertyForm/>
        </section>
    );
};

export const metadata: Metadata = {
    title: `ساخت ملک جدید ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
};