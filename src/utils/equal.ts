export function shallowequal<T extends object>(obj: T, obj1: T) {
    const keys = Object.keys(obj) as Array<keyof T>;
    const count = keys.length;

    const keys1 = Object.keys(obj1);
    if (keys.length !== keys1.length) return false;

    for (let index = 0; index < count; index++) {
        const key = keys[index];
        if (!(key in obj1)) return false;
        if (obj[key] !== obj1[key]) return false;
    }

    return true;
}
