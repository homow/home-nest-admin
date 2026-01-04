"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Button from "@/components/button/Button";

export default function NotFound() {
    const [hasBackPath, setHasBackPath] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        queueMicrotask(() => {
            setHasBackPath(window.history.length > 1);
        });
    }, []);

    const goBack = () => router.back();
    const goHome = () => router.push("/");

    return (
        <section
            className="flex-1 min-h-full flex flex-col items-center justify-center gap-6 px-4 text-center"
        >
            <h1
                className="text-6xl font-extrabold text-rose-500"
            >
                404
            </h1>
            <p
                className="text-lg text-gray-700 dark:text-gray-300"
            >
                صفحه‌ای که دنبالشی وجود نداره.
            </p>

            <div
                className="flex gap-4 mt-4 flex-wrap justify-center"
            >
                <Button
                    btnStyle={"fill"}
                    as={"button"}
                    onClick={goHome}
                    className="bg-rose-500 hover:bg-rose-600 "
                >
                    بازگشت به خانه
                </Button>
                {hasBackPath && (
                    <Button
                        btnStyle={"fill"}
                        as={"button"}
                        onClick={goBack}
                    >
                        بازگشت به صفحه قبل
                    </Button>
                )}
            </div>
        </section>
    );
};