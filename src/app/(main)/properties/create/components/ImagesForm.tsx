"use client";

import {ChangeEvent, FormEvent, useRef, useState} from "react";
import useAlertModal from "@/hooks/useAlertModal";
import Input from "@/components/forms/Input";
import Image from "next/image";

export default function ImagesForm(
    {}
) {
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [othersFile, setOthersFile] = useState<File[]>([]);
    const [mainPreview, setMainPreview] = useState<string>("");
    const [othersPreview, setOthersPreview] = useState<string[]>([]);
    const {AlertModalComponent, changeAlertModalData} = useAlertModal({
        initAlertType: "warning",
        initMessage: ""
    });
    const mainImageRef = useRef<HTMLInputElement>(null);
    const imagesRef = useRef<HTMLInputElement>(null);
    const maxSizeMB: number = 3;

    function handleMainChange(e: ChangeEvent<HTMLInputElement>) {
        const file: File | undefined = e.target.files?.[0];

        if (file && file.size / 1024 / 1024 > maxSizeMB) {
            changeAlertModalData({
                isOpen: true,
                data: {
                    alertType: "warning",
                    message: "سایز تصویر باید کمتر از 3 مگابایت باشد.",
                }
            });
            e.target.value = "";
            setMainFile(null);
            setMainPreview("");
            return;
        }

        if (file) setMainFile(file);
        setMainPreview(file ? URL.createObjectURL(file) : "");
    }

    function handleOthersChange(e: ChangeEvent<HTMLInputElement>) {
        function resetFiles(message: string) {
            changeAlertModalData({
                isOpen: true,
                data: {
                    alertType: "warning",
                    message,
                }
            });
            setOthersFile([]);
            setOthersPreview([]);
            e.target.value = "";
        }

        const files: File[] = Array.from(e.target.files || []);

        if (files.length > 2) {
            resetFiles("تعداد تصاویر باید حداکثر 2 عدد باشد");
            return;
        }

        for (const f of files) {
            if (f.size / 1024 / 1024 > maxSizeMB) {
                resetFiles("سایز تصویر باید کمتر از 3 مگابایت باشد.");
                return;
            }
        }

        setOthersFile(files);
        setOthersPreview(files.map(f => URL.createObjectURL(f)));
    }

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(mainFile);
        console.log(othersFile);
    }

    return (
        <form
            onSubmit={submitHandler}
        >
            <p
                className={"mb-4"}
            >
                <span
                    className={"font-bold text-amber-500"}>
                    توجه:
                </span>
                سایز هر تصویر باید زیر 3 مگابایت باشه
            </p>

            <AlertModalComponent/>

            {/* images */}
            <div
                className={"multi-inputs-style"}
            >
                {/* main_images */}
                <Input
                    dir="ltr"
                    as="input"
                    placeholder=""
                    id="main-image"
                    inputType="file"
                    name="main_image"
                    autoComplete="off"
                    label="تصویر اصلی"
                    inputRef={mainImageRef}
                    onChangeInput={handleMainChange}
                    accept="image/png,image/jpeg,image/webp"
                />

                {/* images */}
                <Input
                    multiple
                    dir="ltr"
                    as="input"
                    placeholder=""
                    id="main-image"
                    inputType="file"
                    name="main_image"
                    autoComplete="off"
                    inputRef={imagesRef}
                    label="تصاویر بیشتر(حداکثر 2)"
                    onChangeInput={handleOthersChange}
                    accept="image/png,image/jpeg,image/webp"
                />
            </div>

            <div
                className={
                    "flex flex-wrap gap-2 justify-between items-center"
                }
            >
                <div
                    className={"max-w-60 aspect-square mt-6"}
                >
                    {mainPreview &&
                        <Image
                            width={240}
                            height={240}
                            alt="main preview"
                            src={`${mainPreview}`}
                            className={"size-full"}
                        />
                    }
                </div>

                {othersPreview.length > 0 && (
                    <div
                        className={"flex flex-wrap gap-8 mt-8"}
                    >
                        {othersPreview.map((url, index) => (
                            <Image
                                src={url}
                                key={url}
                                width={120}
                                height={120}
                                alt={`preview ${index}`}
                                className={"size-30 object-cover"}
                            />
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
};