import type { Message } from "discord.js"

/**
 * !git
 * links back to the github repo
 */

export const name = "!git"
export function action(msg: Message){
    msg.reply("https://github.com/Contrastellar/OpossumBot")
}
