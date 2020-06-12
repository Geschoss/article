const a = {
    name: 'pavel',
    age: 30,
};

const b = a;

b.name = 'boris';

console.log(a);
console.log(b);

const offerParams = {
    buttonName: 'Оформить карту',
    product_type: 'platinum-card-new',
    reason: 'Не требуется|Не интересно|Не сейчас|Другое',
};

const convertOfferToInitialValue = (offerParams) => {
    offerParams.reason = offerParams.reason.split('|')[0];

    return offerParams;
};

const initialValue = convertOfferToInitialValue(offerParams);

console.log(initialValue);
console.log(offerParams);
