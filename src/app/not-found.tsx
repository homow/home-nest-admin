"use client";

import {useRouter} from "next/navigation";
import Button from "@/components/button/Button";
import useToggle from "@/hooks/useToggle";
import {useEffect} from "react";

export default function NotFound() {
    const {toggle: hasBackPath, handleToggle: setHasBackPath} = useToggle();
    const router = useRouter();

    useEffect(() => {
        setHasBackPath(window.history.length > 1);
        // eslint-disable-next-line
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
                    className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors"
                >
                    بازگشت به خانه
                </Button>
                {hasBackPath && (
                    <Button
                        btnStyle={"fill"}
                        as={"button"}
                        onClick={goBack}
                        className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
                    >
                        بازگشت به صفحه قبل
                    </Button>
                )}
            </div>
        </section>
    );
};