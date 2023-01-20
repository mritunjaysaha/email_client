export function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);

    const dd = date.getDate();
    const mm = date.getMonth();
    const yy = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();



    const meridian = hours > 12 ? "pm" : "am";

    const formattedDate = `${dd < 10 ? `0${dd}` : dd}/${mm < 10 ? `0${mm}` : mm}/${yy} ${hours % 12
        }:${minutes < 10 ? `0${minutes}` : minutes}${meridian}`;

    return formattedDate;
}
