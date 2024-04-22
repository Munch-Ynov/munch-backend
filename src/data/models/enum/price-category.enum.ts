/**
 * Enum of the price category
 */
enum PriceCategoryEnum {
  ECO = "ECO", // "Economique"
  MODERATE = "MODERATE",
  EXPENSIVE = "EXPENSIVE",
  VERY_EXPENSIVE = "VERY_EXPENSIVE",
}

export { PriceCategoryEnum };

export type PriceCategory = keyof typeof PriceCategoryEnum;
