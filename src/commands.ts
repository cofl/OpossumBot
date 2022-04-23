/*
 * File containing the commands source for Opossumbot_2
 * Author: contrastellar (Gabriella Agathon, 2022)
 */
import { sync as glob } from "glob"
import { resolve } from "path/posix"
import type { Message } from "discord.js"

export type CommandAction = (msg: Message, args: string[]) => void | Promise<void>

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
