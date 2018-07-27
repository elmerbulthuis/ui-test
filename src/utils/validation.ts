export function isEmpty(value: any) {
    if (value === "") return true;
    if (value === null) return true;
    if (value === undefined) return true;
    return false;
}

export function isEmail(value: string) {
    const emailRegex = /^.+@.+$/gi;
    return emailRegex.test(value);
}
