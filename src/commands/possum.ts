import { Message, MessageAttachment } from "discord.js"
import { warn, log } from "console"
import { AddImageOptions, addImages, sql } from "../sql"
import fetch from "node-fetch"

const IMAGE_GLOB = "/home/contrastellar/PossumBot/img/possum/**/*"

/**
 * !possum
 * Fetches an opossum from the db, attaches
 * alt text, sends the message
 */

async function attach(msg: Message){
    const [ row ] = await sql`select * from random_image();`
    if(!row){
        warn("No files were retrieved when trying to execute !possum.")
        await msg.channel.send(":possum:")
        return
    }
    await msg.channel.send({
        files: [
            new MessageAttachment(row.image, `image.png`)
        ]
    })
}

async function help(msg: Message){
    await msg.reply("Usage: !possum [add [file]]")
}

export async function download(url: string): Promise<Buffer> {
    log(`Downloading: ${url}`)
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    return Buffer.from(buffer)
}

async function add(msg: Message, file?: string, rest?: string[]){
    const user = msg.author
    // download file
    const images: AddImageOptions[] = []
    if(file)
        images.push({ data: await download(file), user })
    for(const { url } of msg.attachments.values())
        images.push({ data: await download(url), user})
    if(0 === images.length)
        return await help(msg);

    // insert files
    await addImages(images)
    await msg.reply(images.length == 1
        ? `Added a possum!`
        : `Added ${images.length} possums!`)
}

export const name = "!possum"
export async function action(msg: Message, args: string[]){
    if(0 === args.length)
        return await attach(msg);
    const [ command, opt, ...rest ] = args;
    if(command !== "add")
        return await help(msg);
    return await add(msg, opt, rest);
}
