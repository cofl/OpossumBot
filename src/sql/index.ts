import { Temporal } from "@js-temporal/polyfill"
import type { Snowflake } from "discord.js"
import { readFile } from "fs/promises"
import postgres from "postgres"
import { createHash } from "crypto"

export * from './migrations'

const {
    POSTGRES_HOST: host,
    POSTGRES_DATABASE: database,
    POSTGRES_USER: user,
    POSTGRES_PASSWORD: password
} = process.env
export const sql = postgres({ host, database, user, password })
export const rawDB = postgres({ host, user, password })

type AddImageArguments = {
    path: string,
    user?: Snowflake
}
export async function addImages(images: AddImageArguments[]){
    const created = Temporal.Now.instant().toString()
    const imageData = await Promise.all(images.map(async ({ path, user }) => {
        const image = await readFile(path)
        const hash = createHash('sha256')
            .update(image)
            .digest()
            .readBigInt64LE()
            .toString()
        const added_by = user ? Number(user) : null
        return { hash, image, created, added_by }
    }))
    return await sql`
        insert into possum_images ${
            sql(imageData, 'hash', 'image', 'added_by', 'created')
        } on conflict do nothing
    `
}
