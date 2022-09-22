let plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
};

let invoices = [
    {
        customer: 'BigCo',
        preformances: [
            {
                playID: 'hamlet',
                audience: 55,
            },
            {
                playID: 'as-like',
                audience: 35,
            },
            {
                playID: 'othello',
                audience: 40,
            },
        ],
    },
    {
        customer: 'Pako',
        preformances: [
            {
                playID: 'hamlet',
                audience: 123,
            },
            {
                playID: 'as-like',
                audience: 55,
            },
            {
                playID: 'othello',
                audience: 10,
            },
        ],
    },
];

module.exports = {
    plays,
    invoices,
};
