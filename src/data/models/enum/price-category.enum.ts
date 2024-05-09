/**
 * Enum of the price category
 */
enum PriceCategoryEnum {
    ECO = 'ECO',
    MODERATE = 'MODERATE',
    EXPENSIVE = 'EXPENSIVE',
    VERY_EXPENSIVE = 'VERY_EXPENSIVE',
}

export type PriceCategory = keyof typeof PriceCategoryEnum

export const PriceCategory: typeof PriceCategoryEnum = PriceCategoryEnum
