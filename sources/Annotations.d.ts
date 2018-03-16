interface Array<T> {
    index(where: (element: T) => boolean): number
}
