import Image from "next/image";
import Link from "next/link";
import type {ChildrenComponentProps} from "@/types/ui";

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
                alt="Logo"
                width={518}
                height={518}
                placeholder="blur"
                src="/images/shared/logo.webp"
                className={
                    "size-8"
                }
            />
            {children}
        </Link>
    );
};