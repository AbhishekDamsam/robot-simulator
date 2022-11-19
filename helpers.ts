

export function includes<T extends U, U>(collection: ReadonlyArray<T>, ele: U): ele is T {
    return collection.includes(ele as T);
}

export function indexOf<T extends U, U>(collection: ReadonlyArray<T>, ele: U): number {
    return collection.indexOf(ele as T);
}

export function getClassProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}