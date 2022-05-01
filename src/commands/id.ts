import type { Message } from "discord.js"
import { Opossum } from "../_core"

/**
 * !id
 * used to ID a possum.
 */
export const name = "!id"
export async function action(msg: Message){
    if(!msg.reference?.messageId)
        return
    const original = await msg.channel.messages.fetch(msg.reference.messageId)
    if(!original)
        return
    if(original.author.id !== Opossum.user!.id)
        return

}
