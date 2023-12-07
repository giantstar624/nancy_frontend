
import dateFormat from 'dateformat'

const getTime = (DateObj) => {
    const date = toLocalTime(DateObj);
    return dateFormat(date, "mm-dd hh:MM:ss");
};
const toLocalTime = (time) => {
    const d = new Date(time);
    const offset = (new Date().getTimezoneOffset() / 60) * -1;
    const n = new Date(d.getTime() + offset);
    return n;
}
export default getTime;
