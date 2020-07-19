interface Array<T> {
    first<R>(f: (x: T) => R | null | undefined): R | undefined
}

Array.prototype.first = function <T, R>(this: Array<T>, f: (x: T) => R | null | undefined): R | undefined {
    for (const x of this) {
        const result = f(x)
        if (result != null) {
            return result
        }
    }
}