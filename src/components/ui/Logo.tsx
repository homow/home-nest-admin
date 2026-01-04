import type {MainComponentProps} from "@/types/ui";
import Image from "next/image";
import Link from "next/link";

export default function Logo({children}: MainComponentProps) {
    return (
        <Link
            href="/"
            className={
                "pr-4 flex flex-row items-center gap-4 hover:text-primary-txt"
            }
        >
            <Image
                preload
                width={128}
                height={128}
                quality={75}
                sizes={"32px"}
                alt="لوگوی سایت"
                src="/images/shared/logo.webp"
                className={"object-contain size-8"}
            />
            {children}
        </Link>
    );
};