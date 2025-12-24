"use client";

import type {FormCreatePropertyType} from "@/types/properties";
import {useEffect, useState} from "react";
import useToggle from "@/hooks/useToggle";

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
    "title" | "description" | "province_and_city" |
    "address" | "features" | "price_with_discount" | "price"
>

export default function CreatePropertyForm() {
    const [formData, setFormData] = useState<FormCreatePropertyType>(initialFormData);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormPropertyErrors>({
        title: "",
        description: "",
        province_and_city: "",
        address: "",
        features: [""],
        price: "",
        price_with_discount: ""
    });

    // test for has error now
    useEffect(() => {
        const rawErrors: boolean = Object.values(errors).filter(e =>
            Array.isArray(e) ? e.length : Boolean(e)
        ).length > 0;

        queueMicrotask(() => {
            setHasError(rawErrors);
        });
    }, [errors]);

    // features available
    const availableFeatures: string[] = [
        "بالکن", "پارکینگ", "آسانسور", "انبار", "استخر"
    ];

    // handle features
    function handleFeatureToggle(feature: string) {
        setFormData(prevState => ({
            ...prevState,
            features: prevState.features.includes(feature)
                ? prevState.features.filter(f => f !== feature)
                : [...prevState.features, feature]
        }));
    }
}