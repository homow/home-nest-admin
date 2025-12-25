"use client";

import {useRef, useState} from "react";
import useAlertModal from "@/hooks/useAlertModal";
import Input from "@/components/forms/Input";
import Image from "next/image";

export default function ImagesForm() {
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

    return (
        <form
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
                    inputType="file"
                    id="main-image"
                    name="main_image"
                    label="تصویر اصلی"
                    inputRef={mainImageRef}
                    // onChange={handleMainChange}
                    accept="image/png,image/jpeg,image/webp"
                />

                {/* images */}
                <Input
                    label="تصاویر بیشتر(حداکثر 2)"
                    dir="ltr"
                    as="input"
                    placeholder=""
                    inputType="file"
                    id="main-image"
                    name="main_image"
                    inputRef={imagesRef}
                    // onChange={handleMainChange}
                    accept="image/png,image/jpeg,image/webp"
                    // onChange={handleOthersChange}
                />
            </div>

            <div
                className={
                    "flex flex-wrap gap-2 justify-between items-center"
                }
            >
                <div
                    className={"max-w-60 mt-6"}
                >
                    {mainPreview &&
                        <Image
                            width={240}
                            height={240}

                            alt="main preview"
                            className={"w-full"}
                            src={`${mainPreview}`}
                        />
                    }
                </div>

                {othersPreview.length > 0 && (
                    <div className={"flex flex-wrap gap-8 mt-8"}>
                        {othersPreview.map((url, index) => <img key={url} src={url} alt={`preview ${index}`} className={"size-30 object-cover"}/>)}
                    </div>
                )}
            </div>
        </form>
    );
};