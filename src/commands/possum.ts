import { Message, MessageAttachment } from "discord.js"
import { sync as glob } from "glob"
import { random } from "../util"
import { warn } from "console"

const IMAGE_GLOB = "/home/contrastellar/PossumBot/img/possum/**/*"

/**
 * !possum
 * Fetches an opossum from the db, attaches
 * alt text, sends the message
 */

export const name = "!possum"
export async function action(msg: Message){
    const file = random(glob(IMAGE_GLOB))
    if(!file){
        warn("No files were retrieved when trying to execute !possum.")
        await msg.channel.send(":possum:")
        return
    }
    await msg.channel.send({
        attachments: [
            new MessageAttachment(file)
        ]
    })
}
