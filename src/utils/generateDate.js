

const generateDate = () => {
    const date = new Date();
    const day = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();
    const hour = date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
    const newDate = day + "T" + hour;
    return newDate;
}

module.exports = { generateDate };