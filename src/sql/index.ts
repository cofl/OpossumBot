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
export async function addImage({ path, user }: AddImageArguments){
    const now = Temporal.Now.instant()
    const data = await readFile(path)
    const hash = createHash('sha256').update(data).digest().readBigInt64LE().toString()
    const userID = user ? Number(user) : null
    return await sql`
        insert into possum_images (hash, image, created, added_by) values (
            ${hash}, ${data}, ${now.toString()}, ${userID}
        ) on conflict do nothing
    `
}
