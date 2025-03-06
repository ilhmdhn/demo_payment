function formatToIDR(amount) {
    return 'Rp. ' + new Intl.NumberFormat('id-ID').format(amount);
}


module.exports = {
    formatToIDR
}