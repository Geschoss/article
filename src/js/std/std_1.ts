type Offer = {
    offerName: string;
    offerType: string;
    offerParams: {
        reason: string;
        buttonName: string;
        product_type: string;
    };
};
type OfferFormValue = {
    [key in keyof Offer['offerParams']]: string;
};

const offer: Offer = {
    offerName: 'Платинум',
    offerType: 'promo_product_mb',
    offerParams: {
        buttonName: 'Оформить карту',
        product_type: 'platinum-card-new',
        reason: 'Не требуется|Не интересно|Не сейчас|Другое',
    },
};

const returningValue: OfferFormValue = {
    reason: 'Не требуется',
    buttonName: 'Оформить карту',
    product_type: 'platinum-card-new',
};

const makeOfferFormValue = (offer: Offer): OfferFormValue => {
    return offer.offerName;
}

const formValue = makeOfferFormValue(offer);

console.log(formValue);
