import type {Metadata} from 'next';
import ImagesForm from "./components/ImagesForm";
import CreatePropertyForm from "./components/CreatePropertyForm";

export default function CreateProperties() {
    return (
        <section
            className={"main-components space-y-12"}
        >
            <h3>افزودن ملک جدید</h3>

            <ImagesForm/>
            <CreatePropertyForm/>
        </section>
    );
};

export const metadata: Metadata = {
    title: `ساخت ملک جدید ${process.env.NEXT_PUBLIC_BASE_TITLE}`,
};