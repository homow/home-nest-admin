import type {ChildrenComponentProps} from "@/types/ui";
import Image from "next/image";
import Link from "next/link";

export default function Logo({children}: ChildrenComponentProps) {
    return (
        <Link
            href="/"
            className={
                "pr-4 flex flex-row items-center gap-4 hover:text-primary-txt"
            }
        >
            <Image
                preload
                sizes={"32px"}
                width={128}
                height={128}
                quality={75}
                alt="لوگوی سایت"
                className={"object-contain size-8"}
                src="/images/shared/logo.webp"
            />
            {children}
        </Link>
    );
};