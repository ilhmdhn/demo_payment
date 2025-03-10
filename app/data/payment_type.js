
const paymentType = [
    {
        id: 'ewallet',
        name: 'Dompet Digital',
        list: [
            {
                code: 'ID_OVO',
                name: 'OVO'
            }, {
                code: 'ID_SHOPEEPAY',
                name: 'Shopee Pay'
            }, {
                code: 'ID_DANA',
                name: 'Dana'
            }, {
                code: 'ID_LINKAJA',
                name: 'Link Aja'
            }, {
                code: 'ID_ASTRAPAY',
                name: 'Astra Pay'
            }, {
                code: 'ID_JENIUSPAY',
                name: 'Jenius Pay'
            }
        ]
    },{
        id: 'qris',
        name: 'QRIS',
    },
    {
        id: 'retail',
        name: 'Toko Retail',
        list: [
            {
                code: 'INDOMARET',
                name: 'Indomaret'
            }, {
                code: 'ALFAMART',
                name: 'Alfamart'
            }
        ]
    },
    {
        id: 'va',
        name: 'Virtual Account',
    }
]

export default paymentType;

/* 
    {
        type: 'debit card',
        list: [
            {

            }
        ]
    },
    {
        type: 'credit card'
    },
*/