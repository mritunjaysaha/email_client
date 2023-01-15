export function formatDate(unformattedDate) {
    const date = new Date(unformattedDate);

    const dd = date.getDate();
    const mm = date.getMonth();
    const yy = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const meridian = hours > 12 ? "pm" : "am";

    const formattedDate = `${dd}/${mm}/${yy} ${hours % 12
        }:${minutes}${meridian}`;

    return formattedDate;
}
