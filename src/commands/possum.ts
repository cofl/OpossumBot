import { Message, MessageAttachment } from "discord.js"
import { warn } from "console"
import { sql } from "../sql"

const IMAGE_GLOB = "/home/contrastellar/PossumBot/img/possum/**/*"

/**
 * !possum
 * Fetches an opossum from the db, attaches
 * alt text, sends the message
 */

export const name = "!possum"
export async function action(msg: Message){
    const [ row ] = await sql`select * from random_image();`
    if(!row){
        warn("No files were retrieved when trying to execute !possum.")
        await msg.channel.send(":possum:")
        return
    }
    console.log(row)
    await msg.channel.send({
        files: [
            new MessageAttachment(row.image, `image.png`)
        ]
    })
}
