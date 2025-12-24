"use client";

import type {FormCreatePropertyType} from "@/types/properties";
import {FormEvent, useEffect, useState} from "react";
import FormButton from "@/components/button/FormButton";
import {RedStarField} from "@/components/ui/Fragments";
import Input from "@/components/forms/Input";

// initial value in form data
const initialFormData: FormCreatePropertyType = {
    title: "",
    property_slug: "",
    category: "sale",
    price: "",
    price_with_discount: "",
    description: "",
    province_and_city: "",
    address: "",
    features: [],
    discount_until: "",
    tags: [],
    stock: 1,
    metadata: {},
};

type FormPropertyErrors = Pick<
    FormCreatePropertyType,
    "title" | "description" | "province_and_city"
    | "address" | "price_with_discount" | "price"
> & { features: string };

export default function CreatePropertyForm() {
    const [formData, setFormData] = useState<FormCreatePropertyType>(initialFormData);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormPropertyErrors>({
        title: "",
        description: "",
        province_and_city: "",
        address: "",
        price: "",
        price_with_discount: "",
        features: "",
    });

    // test for has error now
    useEffect(() => {
        const rawErrors: boolean = Object.values(errors).filter(e =>
            Boolean(e)
        ).length > 0;

        queueMicrotask(() => {
            setHasError(rawErrors);
        });
    }, [errors]);

    // check error features
    useEffect(() => {
        if (errors.features && formData.features.length > 0) {
            queueMicrotask(() => {
                setErrors({...errors, features: ""});
            });
        }
    }, [errors, formData.features.length]);

    // handle changes in data form
    function handleChange(name: string, value: string) {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // handle features
    function handleFeatureToggle(feature: string) {
        setFormData(prevState => ({
            ...prevState,
            features: prevState.features.includes(feature)
                ? prevState.features.filter(f => f !== feature)
                : [...prevState.features, feature]
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
    }

    // features available
    const availableFeatures: string[] = [
        "بالکن", "پارکینگ", "آسانسور", "انبار", "استخر"
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className={"space-y-8"}
        >
            <p>
                <span
                    className={"text-amber-500 font-bold"}
                >
                    توجه:
                </span>
                فیلدهایی که با
                <RedStarField/>
                مشخص شدن اجباری، و بقیه فیلدها اختیاری هستند.
            </p>

            <div className={"space-y-8 @6xl/main:grid grid-cols-2 gap-x-4"}>
                {/* title and id */}
                <div className={"multi-inputs-style"}>
                    {/* title */}
                    <Input
                        required
                        id="title"
                        as="input"
                        name="title"
                        inputType="text"
                        label="عنوان ملک"
                        placeholder="مثلاً: ویلایی، صدرا"
                        value={formData.title}
                        onChangeInput={event => {
                            const val: string = event.target.value;
                            handleChange("title", val);
                            if (errors.title && val.trim()) {
                                setErrors({...errors, title: ""});
                            }
                        }}
                        hasError={errors.title}
                    />

                    {/* id */}
                    <Input
                        as="input"
                        inputType="text"
                        label="شناسه ملک"
                        id="property_slug"
                        name="property_slug"
                        placeholder="مثلاً A-1234"
                        autoComplete="property_number"
                        value={formData.property_slug || ""}
                        onChangeInput={event => {
                            handleChange("property_slug", event.target.value);
                        }}
                    />
                </div>

                {/* category and price */}
                <div className={"multi-inputs-style"}>
                    {/* category */}

                </div>
            </div>

            <FormButton>
                ثبت ملک
            </FormButton>
        </form>
    );
};