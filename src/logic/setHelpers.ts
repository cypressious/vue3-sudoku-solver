export function* subsets<T>(array: T[], offset: number = 0): Generator<T[]> {
    while (offset < array.length) {
        const first = array[offset++]
        for (let subset of subsets(array, offset)) {
            subset.push(first);
            yield subset;
        }
    }
    yield [];
}
