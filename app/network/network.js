import { create } from 'axios';

const encodedKey = Buffer.from(`xnd_development_5Rn0rouE1lO5VP8h7WLy1sbdRJlN7fiYZt5XpXFOhXalN6kjCHz9xPhJl4o3jc:`).toString("base64");

const instance = create({
    baseURL: 'https://api.xendit.co/',
    timeout: 1000,
    headers: {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json'
    }
});

const getVaList = async () => {
    try {
        const networkResponse = await instance.get('available_virtual_account_banks');
        return networkResponse.data.filter(data => data.country == "ID" && data.is_activated == true);
    } catch (err) {
        console.error(`Error getVaList ${err.message}`);
        return null;
    }
}

const generateVAPayment = async (nominal, channel, customerName) => {
    try {
        const networkResponse = await instance.post('payment_requests', {
            "currency": "IDR",
            "amount": nominal,
            "payment_method": {
                "type": "VIRTUAL_ACCOUNT",
                "reusability": "ONE_TIME_USE",
                "reference_id": `va ${generateUniqueId()}`,
                "virtual_account": {
                    "channel_code": channel,
                    "channel_properties": {
                        "customer_name": customerName
                    }
                }
            },
            "metadata": {
                "sku": "IHP TEST PAYMENT VA"
            }
        });

        console.log(networkResponse.data);
    } catch (err) {
        console.error(`generateVAPayment ${err.message}`);
    }
}

const checkVaState = async (paymentId) => {
    try {
        const networkResponse = await instance.get(`callback_virtual_account_payments/payment_id=:${paymentId}`);
        console.log(networkResponse);
    } catch (err) {
        console.error(`checkVaState ${err.message}`);
    }
}

const createQrisPayment = async (nominal) => {
    try {
        const networkResponse = await instance.post('qr_codes', {
            "reference_id": generateUniqueId(),
            "type": "DYNAMIC",
            "currency": "IDR",
            "amount": nominal,
            "expires_at": addHoursToTimestamp(24)
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(networkResponse);
    } catch (err) {
        console.error(`createQrisPayment ${err.message}`);
    }
}

const checkQrisState = async (code) => {
    try {
        const networkResponse = await instance.get(`qr_codes/${code}`);
        console.log(networkResponse);
    } catch (err) {
        console.error(`checkQrisState ${err.message}`);
    }
}

const createEwalletPayment = async (nominal, channel) => {
    try {
        const networkResponse = await instance.post('ewallets/charges', {
            "reference_id": generateUniqueId(),
            "currency": "IDR",
            "amount": nominal,
            "checkout_method": "ONE_TIME_PAYMENT",
            "channel_code": channel,
            "channel_properties": {
                "mobile_number": "+6285749086487"
            },
            "metadata": {
                "branch_area": "IHP",
                "branch_city": "SURABAYA"
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(networkResponse.data);

    } catch (err) {
        console.error(`createEwalletPayment ${err.message}`);
    }
}

const checkEwalletState = async (chargeId) => {
    try {
        const networkResponse = await instance.get(`ewallets/charges/${chargeId}`);
        console.log(networkResponse);
    } catch (err) {
        console.log(`checkEwalletState ${err}`)
    }
}

const generateRetailPayment = async (retailCode, nominal, customerName) => {
    try {
        const networkResponse = await instance.post(`fixed_payment_code`, {
            "external_id": `retailCode-${generateUniqueId()}`,
            "retail_outlet_name": retailCode,
            "name": customerName,
            "expected_amount": nominal
        });

        console.log(networkResponse);
    } catch (err) {
        console.error(`generateRetailPayment ${err}`);
    }
}

const checkRetailState = async (paymentCode) => {
    try {
        const networkResponse = await instance.get(`fixed_payment_code/:${paymentCode}`);
        console.log(networkResponse);
    } catch (err) {
        console.log(`checkRetailState ${err}`)
    }
}

const generateUniqueId = () => {
    return `ihp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

function addHoursToTimestamp(hours) {
    const date = new Date();
    date.setHours(date.getHours() + hours);

    return date.toISOString();
}


/*
    Payment list

    Virtual Account
        - list VA available (done)
        - generate VA code 
        - cek VA state

    QRIS
        - generate qris payment.
        - cek va state
    
    E-Wallet
        - list e-wallet
        - generate e-wallet payment.
        - cek e-wallet state
*/

export {
    getVaList,
    generateVAPayment,
    checkVaState,
    createQrisPayment,
    checkQrisState,
    createEwalletPayment,
    checkEwalletState,
    generateRetailPayment,
    checkRetailState
};