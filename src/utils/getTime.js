import dateFormat from 'dateformat'
const getTime = (DateObj) => {
    const date = toLocalTime(DateObj);
    return dateFormat(date, "mm-dd hh:MM:ss");
};
const toLocalTime = (time) => {
    var d = new Date(time);
    var offset = (new Date().getTimezoneOffset() / 60) * -1;
    var n = new Date(d.getTime() + offset);
    return n;
}
export default getTime;
