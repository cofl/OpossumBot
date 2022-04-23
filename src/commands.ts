/*
 * File containing the commands source for Opossumbot_2
 * Author: contrastellar (Gabriella Agathon, 2022)
 */
import { createConnection, MysqlError } from "mysql"
import { error, log } from "console"
import { promisify } from "util"
import { sync as glob } from "glob"
import { resolve } from "path/posix"
import type { Message } from "discord.js"

export type CommandAction = (msg: Message, args: string[]) => void | Promise<void>
export async function connection({
    MYSQL_DATABASE: dbURL,
    MYSQL_USER: dbUser,
    MYSQL_PASSWORD: dbPass,
}: NodeJS.ProcessEnv){
    const connection = createConnection({
        host: dbURL,
        user: dbUser,
        password: dbPass,
        database: "OpossumBot"
    })

    try {
        const connect = promisify(connection.connect).bind(connection)
        await connect()
        log(`connected as id ${connection.threadId}`)
        return connection
    } catch(e){
        const err = e as MysqlError
        error(`Error connecting: ${err.stack}`)
        throw e
    }
}

const commands = new Map(glob(resolve(__dirname, "commands/**/*.js"))
    .map(path => require(path) as { name: string, action: CommandAction })
    .map(({ name, action }) => [ name, action ]))
export async function userCommands(msg: Message, args: string[]){
    const [ command, ...cargs ] = args
    if(!command)
        return
    const action = commands.get(command)
    if(!action)
        return
    await action(msg, cargs)
}
