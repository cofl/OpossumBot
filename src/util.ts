export function random<T>(items: T[]): T | undefined {
    const index = Math.floor(Math.random() * items.length)
    return items.at(index)
}
