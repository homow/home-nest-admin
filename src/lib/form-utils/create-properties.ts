import {parseDigitsStringToNumber} from "./helper";

// convert array of "key = value" strings to object
function parseMetadataCreatePropertyForm(
    data: string[]
): Record<string, string> {
    return data.reduce<Record<string, string>>(
        (acc, item) => {
            const [key, value] = item.split("=");
            if (!key.trim() || !value.trim()) return acc;
            acc[key.trim()] = value.trim();
            return acc;
        }, {} as Record<string, string>
    );
}

function checkPrice(
    price?: string,
    discount?: string,
): boolean {
    const priceTrimmed: number | null = price?.trim()
        ? parseDigitsStringToNumber(price)
        : 0;
    const priceWithDiscountTrimmed: number | null = discount?.trim()
        ? parseDigitsStringToNumber(discount)
        : 0;

    if (
        priceTrimmed
        && priceWithDiscountTrimmed
    ) return priceWithDiscountTrimmed < priceTrimmed;

    return true;
}

export {
    checkPrice,
    parseMetadataCreatePropertyForm,
}