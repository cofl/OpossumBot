/*
*   OpossumBot_2 bot core
*   Author: contrastellar (Gabriella Agathon)
*/

// environment
import { log, info, warn, error } from 'console'
import { version as VERSION } from "../package.json"
const {
    DISCORD_TOKEN
} = process.env

// external
import Discord from "discord.js"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

// internal
import { ping, dumpArgv } from "./startup"
import { setupTeardown } from "./teardown"
import { initializeDB, populateDefaultImages } from "./sql/migrations"
import { configure } from "./config"
import { userCommands } from "./commands"

/**
 * add file dependencies
 */
import * as misc from "./misc"

const updateCacheEvery = 500
let numMessages = 0
let mainGuild = null

void async function main()
{
    // configure command-line options and parse
    const argv = await yargs(hideBin(process.argv))
        .usage('$0 <cmd> [args]')
        .option('debug', {
            type: 'boolean',
            description: 'Emit debug info.'
        })
        .help()
        .argv

    // Parse command line arguments (for debug states)
    const DEBUG = argv.debug || false
    if(DEBUG){
        dumpArgv(process.argv)
    }

    // db
    await initializeDB()
    await populateDefaultImages()

    // config
    configure()

    // cleanup
    setupTeardown()

    // make sure we can reach all our resources
    if(!await ping([
        'google.com',
        'discordapp.com'
    ])) throw new Error("Cannot reach all resources.")

    const Opossum = new Discord.Client({
        intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        ],
    })

    try {
        info("Time to log in.")
        const reason = await Opossum.login(DISCORD_TOKEN)
        log(reason)
        info("Starting here.")
        log(`OpossumBot v. ${VERSION} running.`)
    } catch(err){
        error(err)
        return false
    }

    const self = Opossum.user ?? (() => { throw new Error("Bot user is null!") })()

    Opossum.on('ready', async () => {
        Opossum.setMaxListeners(0)
        self.setActivity(`Now updated to v.${VERSION}`)
        log('Startup complete!');
    })

    Opossum.on('messageCreate', async (msg) => {
        try {
            const { author, content, mentions } = msg
            if(author.bot) return // Ignore messages from self

            const args = content.toLowerCase().split(/\s+/g)
            if(mentions.has(self) && content.at(-1) == "?")
               msg.reply("???")

            await userCommands(msg, args)
        } catch(err) {
            error(err)
        }
    })

    return Opossum
}();
