export function createDate(date: string) {
    const timestamp = Date.parse(date);
    const dateObject = new Date(timestamp);
    return dateObject;
}