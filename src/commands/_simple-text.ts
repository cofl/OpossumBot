import type { Message } from "discord.js";

export function text(url: string){
    return (msg: Message) => msg.channel.send(url)
}
