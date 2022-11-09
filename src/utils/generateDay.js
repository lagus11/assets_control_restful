const generateDay = () => {
    const date = new Date();
    const day = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear();
    return day;
}

module.exports = { generateDay };