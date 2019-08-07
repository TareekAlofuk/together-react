import AutoForm from "../../../lib/auto-form/core/AutoForm/AutoForm";

export interface PriceCalculator {
    calculate(): number;
}

export default class RegisterServiceAutoFormPriceCalculator implements PriceCalculator {
    private readonly form: AutoForm;
    private readonly service: any;

    constructor(form: AutoForm, service: any) {
        this.form = form;
        this.service = service;
    }

    calculate(): number {
        if (!this.service) {
            return;
        }
        const priceField = this.form.getField('price');
        const commissionField = this.form.getField('commission');
        const newPriceField = this.form.getField('finalPrice');
        const countField = this.form.getField('count');
        const discountTypeField = this.form.getField('discountType');

        const price = priceField.getValue() ? priceField.getValue() : 0;
        const commission = commissionField.getValue() ? commissionField.getValue() : 0;
        const count = countField.getValue();
        const discountType = discountTypeField.getValue();

        if (discountType === "ratio") {
            if (this.service.discount) {
                const discount = this.service.discount / 100;
                if (this.service.discountOptions === 1) {
                    const newPrice = price - (price * discount);
                    newPriceField.setValue(newPrice * count);
                } else if (this.service.discountOptions === 2) {
                    const newPrice = price - (commission * discount);
                    newPriceField.setValue(newPrice * count);
                }
            } else {
                newPriceField.setValue(0)
            }
        } else {
            const discount = this.service.discount;
            const newPrice = price - (discount);
            newPriceField.setValue(newPrice * count);

        }
    }
}