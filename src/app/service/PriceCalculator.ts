export interface PriceCalculator {
    calculate(): number;
}

export default class DefaultPriceCalculator implements PriceCalculator {
    calculate(): number {
        return 0;
    }
}