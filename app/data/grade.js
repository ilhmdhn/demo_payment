const plans = [
    {
        name: "Basic",
        price: 75000,
        stb: false,
        limit_download: false,
        support: false,
        ultra_hd: false,
        ads: true
    },
    {
        name: "Standard",
        price: 100000,
        stb: true,
        limit_download: false,
        support: false,
        ultra_hd: false,
        ads: true
    },
    {
        name: "Premium",
        price: 110000, // Pastikan format angka benar
        stb: true,
        limit_download: false,
        support: true,
        ultra_hd: true,
        ads: true
    },
];

export default plans;
