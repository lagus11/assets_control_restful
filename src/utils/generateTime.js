

const generateTime = (day) => {
    const date = new Date();
    const newDay = day.split("-");
   
   
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const newDate = new Date(newDay[0], newDay[1], newDay[2], hour, minute, second);
    const newDateUrl = day + "T" + hour + "-" + minute + "-" + second;

    return {newDate: newDate, newDateUrl: newDateUrl};
}

module.exports = { generateTime };