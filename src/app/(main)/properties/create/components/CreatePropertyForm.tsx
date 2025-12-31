"use client";

import type {FormCreatePropertyType} from "@/types/properties";
import {FormEvent, useEffect, useState} from "react";
import FormButton from "@/components/button/FormButton";
import {ErrorMessageInputs, RedStarField} from "@/components/ui/Fragments";
import Input from "@/components/forms/Input";
import SelectBox from "@/components/forms/SelectBox";
import {checkPrice, formatPriceDebounced} from "@/lib/utils/form-utils";
import CheckBox from "@/components/forms/CheckBox";
import {cn} from "@/lib/utils/ui-utils";

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
    tags: "",
    stock: 1,
    metadata: "",
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

    // checking has error while errors be changed
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
    function handleChange<T>(name: string, value: T) {
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

    // check features error
    useEffect(() => {
        if (errors.features && formData.features.length > 0) {
            queueMicrotask(() => {
                setErrors({...errors, features: ""});
            });
        }
    }, [errors, formData.features.length]);

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
                    {" "}
                </span>
                فیلدهایی که با
                {" "}
                <RedStarField/>
                {" "}
                مشخص شدن اجباری، و بقیه فیلدها اختیاری هستند.
            </p>

            <div
                className={"space-y-8 @6xl/main:grid grid-cols-2 gap-x-4"}
            >
                {/* title and id */}
                <div
                    className={"multi-inputs-style"}
                >
                    {/* title */}
                    <Input
                        required
                        id="title"
                        as="input"
                        name="title"
                        inputType="text"
                        label="عنوان ملک"
                        autoComplete="off"
                        value={formData.title}
                        hasError={errors.title}
                        placeholder="مثلاً: ویلایی، صدرا"

                        onChangeInput={event => {
                            const val: string = event.target.value;
                            handleChange("title", val);
                            if (errors.title && val.trim()) {
                                setErrors({...errors, title: ""});
                            }
                        }}
                    />

                    {/* id */}
                    <Input
                        as="input"
                        inputType="text"
                        label="شناسه ملک"
                        id="property_slug"
                        autoComplete="off"
                        name="property_slug"
                        placeholder="مثلاً A-1234"
                        value={formData.property_slug || ""}

                        onChangeInput={event => {
                            handleChange("property_slug", event.target.value);
                        }}
                    />
                </div>

                {/* category and price */}
                <div
                    className={"multi-inputs-style"}
                >
                    {/* category */}
                    <SelectBox
                        required
                        label="دسته بندی"
                        value={formData.category}
                        onChange={e => {
                            handleChange("category", e);
                        }}
                        options={[
                            {value: "sale", label: "فروش"},
                            {value: "rent", label: "رهن"}
                        ]}
                    />

                    {/* price */}
                    <Input
                        dir="ltr"
                        as="input"
                        id="price"
                        name="price"
                        inputType="text"
                        autoComplete="off"
                        value={formData.price}
                        hasError={errors.price}
                        placeholder="مثلاً 1,200,000,000"
                        label="قیمت به تومان (اگر وارد نکنید، توافقی میشه)"

                        onChangeInput={event => {
                            const val: string = event.target.value;
                            handleChange("price", val);
                            formatPriceDebounced(val, "price", handleChange);

                            const priceChecked: boolean = checkPrice(val, formData.price_with_discount);

                            if (errors.price && priceChecked) {
                                setErrors({
                                    ...errors,
                                    price: "",
                                    price_with_discount: ""
                                });
                            }
                        }}
                    />
                </div>

                {/* price with discount and discount date */}
                <div
                    className={"multi-inputs-style"}
                >
                    {/* price with discount */}
                    <Input
                        dir="ltr"
                        as="input"
                        inputType="text"
                        autoComplete="off"
                        label="قیمت با تخفیف"
                        hasError={errors.price}
                        id="price_with_discount"
                        name="price_with_discount"
                        placeholder="مثلاً 1,100,000,000"
                        value={formData.price_with_discount}

                        onChangeInput={event => {
                            const val: string = event.target.value;
                            handleChange("price_with_discount", val);

                            formatPriceDebounced(val, "price_with_discount", handleChange);
                            const priceChecked: boolean = checkPrice(formData.price, val);

                            if (errors.price && priceChecked) {
                                setErrors({
                                    ...errors,
                                    price: "", price_with_discount: ""
                                });
                            }
                        }}
                    />

                    {/* discount date */}
                    <Input
                        as="input"
                        placeholder=""
                        autoComplete="off"
                        id="discount_until"
                        name="discount_until"
                        label="تاریخ پایان تخفیف"
                        inputType="datetime-local"
                        value={formData.discount_until}

                        onChangeInput={event => handleChange("discount_until", event.target.value)}
                    />
                </div>

                {/* province and city */}
                <div
                    className={'multi-inputs-style'}
                >
                    {/* province_and_city */}
                    <Input
                        required
                        as="input"
                        inputType="text"
                        label="استان و شهر"
                        id="province_and_city"
                        name="province_and_city"
                        autoComplete="address-level2"
                        placeholder="مثلاً فارس، شیراز"
                        value={formData.province_and_city}
                        hasError={errors.province_and_city}

                        onChangeInput={event => {
                            const val: string = event.target.value;
                            handleChange("province_and_city", val);
                            if (errors.province_and_city && val.trim()) {
                                setErrors({
                                    ...errors,
                                    province_and_city: ""
                                });
                            }
                        }}
                    />

                    {/* address */}
                    <Input
                        required
                        as="input"
                        id="address"
                        label="آدرس"
                        name="address"
                        inputType="text"
                        value={formData.address}
                        hasError={errors.address}
                        autoComplete="street-address"
                        placeholder="مثلا: خیابان قصردشت، کوچه 53، پلاک 10"

                        onChangeInput={event => {
                            const val: string = event.target.value;
                            handleChange("address", val);

                            if (errors.address && val.trim()) {
                                setErrors({...errors, address: ""});
                            }
                        }}
                    />
                </div>
            </div>

            {/* tags, description, metaData, features */}
            <div
                className={
                    "space-y-6 @5xl/main:space-y-0 @5xl/main:flex flex-row @5xl/main:*:w-full gap-4 items-start"
                }
            >
                {/* description */}
                <Input
                    required
                    rows={8}
                    cols={30}
                    as="textarea"
                    label="توضیحات"
                    id="description"
                    name="description"
                    autoComplete="off"
                    value={formData.description}
                    hasError={errors.description}
                    placeholder="مثلاً طبقه دوم، ۲ خوابه، دارای استخر و چند حمام مجزا و . . ."

                    onChangeTextArea={event => {
                        const val: string = event.target.value;
                        handleChange("description", val);

                        if (errors.description && val.trim()) {
                            setErrors({
                                ...errors,
                                description: ""
                            });
                        }
                    }}
                />

                {/* tags and metadata */}
                <div
                    className={
                        "grid grid-cols-1 gap-6 @3xl/main:grid-cols-2 @5xl/main:flex @5xl/main:flex-col"
                    }
                >
                    {/* advanced information (metaData) */}
                    <Input
                        as="input"
                        id="metadata"
                        name="metadata"
                        inputType="text"
                        autoComplete="off"
                        value={formData.metadata}
                        label="اطلاعات اضافی (هر ویژگی را با '،' جدا کنید)"
                        placeholder="مثلاً  فضای پارکینگ = دو ماشین، سقف = 3متر"

                        onChangeInput={event => {
                            handleChange("metadata", event.target.value);
                        }}
                    />

                    {/* tags */}
                    <Input
                        id="tags"
                        as="input"
                        name="tags"
                        inputType="text"
                        autoComplete="off"
                        value={formData.tags}
                        placeholder="مثلاً: نوساز، صدرا_شیراز"
                        label="برچسب‌ها (با کاما '،' جدا کنید)"

                        onChangeInput={event => handleChange("tags", event.target.value)}
                    />

                    {/* features and stock */}
                    <div
                        className={
                            "flex flex-col items-start gap-4 divide-y divide-secondary-txt @xl/main:divide-y-0 @xl/main:divide-x @xl/main:flex-row @xl/main:items-start @3xl/main:col-span-2"
                        }
                    >
                        {/* features */}
                        <div
                            className={
                                cn(
                                    "pb-4 @xl/main:pl-4 @xl/main:pb-0",
                                    errors.features && "bg-rose-600/10"
                                )
                            }
                        >
                            <div>
                                <p
                                    className="flex flex-row gap-1 text-sm font-medium mb-2"
                                >
                                    ویژگی‌ها (حداقل یکی)
                                    <RedStarField/>
                                </p>
                                <div
                                    className="flex items-center flex-wrap gap-3"
                                >
                                    {availableFeatures.map(feature => (
                                        <CheckBox
                                            key={feature}
                                            id={feature}
                                            label={feature}
                                            onChange={() => handleFeatureToggle(feature)}
                                            checked={formData.features.includes(feature)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <ErrorMessageInputs msg={errors.features}/>
                        </div>

                        {/* stock */}
                        <div>
                            <p
                                className={
                                    "flex flex-row gap-1 text-sm font-medium mb-2"
                                }
                            >
                                موجودی
                            </p>
                            <CheckBox
                                id={"stock"}
                                checked={Boolean(formData.stock)}
                                initValue={Boolean(formData.stock)}
                                onChange={() => {
                                    handleChange("stock",
                                        formData.stock === 1 ? 0 : 1
                                    );
                                }}
                                label={"در دسترس است"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <FormButton
                disabled={hasError}
                hasError={hasError
                    ? "ارور موجوده، بررسی کن."
                    : undefined
                }
            >
                ثبت ملک
            </FormButton>
        </form>
    );
};