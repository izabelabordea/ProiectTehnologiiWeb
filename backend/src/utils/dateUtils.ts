export function convertStringToDate(dateString: string) {
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
        return new Date();
    }
    return new Date(timestamp);
}