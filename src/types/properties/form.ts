interface FormCreatePropertyType {
    title: string;
    property_slug: string;
    category: "sale" | "rent";
    price: string;
    price_with_discount: string;
    discount_until: string;
    description: string;
    province_and_city: string;
    address: string;
    stock: 1 | 0;
    tags: string;
    features: string[];
    metadata: string;
}

export type {
    FormCreatePropertyType,
};