export default (date: string) => {
    const d = new Date(date);

    let month: string | number = d.getMonth() + 1;
    month = month < 10 ? '0'+ month : month;

    let day: string | number = d.getDate();
    day = day < 10 ? '0' + day : day;

    const year = d.getFullYear();

    let hour: string | number = d.getHours();
    hour = hour < 10 ? '0' + hour : hour;

    let minute: string | number = d.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;

    const date2 = `${day}.${month}.${year}`;
    const dateWithTime = `${date2} ${hour}:${minute}`

    return { date: date2, dateWithTime };
}