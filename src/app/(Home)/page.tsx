import type {Metadata} from 'next';
import Image from "next/image";

export default function Home() {
    return (
        <section className={"main-components flex flex-row items-end gap-4"}>
            <Image
                preload
                width={240}
                height={240}
                quality={80}
                loading={"eager"}
                alt="لوگوی سایتش آشیانه"
                className={"size-15 object-contain"}
                src="/images/shared/logo.webp"
            />
            <h1>پنل مدیریت آشیانه</h1>
        </section>
    );
};

export const metadata: Metadata = {
    title: "پنل مدیریت | آشیانه"
};