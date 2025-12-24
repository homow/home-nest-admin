interface FormCreatePropertyType {
    title: string;
    category: "sale" | "rent";
    property_slug: string;
    price: string;
    price_with_discount?: string;
    discount_until?: string;
    description: string;
    province_and_city: string;
    address: string;
    features: string[];
    tags?: string[];
    stock: 1 | 0;
    metadata?: Record<string, string>;
}

export type {
    FormCreatePropertyType,
}