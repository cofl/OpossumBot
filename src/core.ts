/*
*   OpossumBot_2 bot core
*   Author: contrastellar (Gabriella Agathon)
*/

/**
 * Version number definition (need to setup for import from package.json)
 */
const VERSION: string = "2-PRERELEASE";

/**
 * NPM packages
 */
import Discord from 'discord.js';
import fs from 'fs';
//const argv = require("process");

/**
 * Import yargs and configure
 */
const argv = require("yargs")
.scriptName("opossumbot")
.usage('Usage: $0 <cmd> -v')
.option('v',{
    alias: 'verbose',
    demandOption: true,
    default: false,
    describe: 'increase verbosity',
    type: 'boolean'
})
.help()
.alias('h','help')
.argv;

/**
 * end of arguments
 */

/**
 * add file dependencies
 */
import * as startup from './startup';
import * as misc from './misc';
import * as commands from './commands';
import * as config from './config';
import { version } from 'os';
import yargs from 'yargs';

/**
 * Parse command line arguments (for debug state)
 */
const debugState = argv.verbose;
if(debugState){
    startup.argvPrint(argv);
    startup.printPackageInfo();
}

config.configure(); //nothing happens in here yet, but this prints first

const discordToken = fs.readFileSync("./discord.token", "utf8").replace("\n", "");

console.log("invoking ping test\n");
let hosts = ['google.com', '8.8.8.8', 'hemisphere.contrastellar.com'];
startup.pingFunction(hosts);

const updateCacheEvery = 500;
let numMessages = 0;
let mainGuild = null;

const Opossum = new Discord.Client({ 
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
console.log("intents established\n");

// Log into Discord using ./DiscordToken.txt
// Nothing happens in log until here
console.log("Logging in..");
Opossum.login(discordToken).catch(function (reason) {
	console.log(reason);
});

console.log("Starting here");
console.log("OpossumBot v."+ VERSION +" running");

Opossum.on('ready', async () => {
    Opossum.setMaxListeners(0);
    Opossum.user?.setActivity("Now updated to v." + VERSION);
    console.log('Startup complete!');
    if(VERSION === "PRERELEASE"){
        console.log("Startup is complete at this point!")
    }
});

Opossum.on('messageCreate', async msg => {
    try {
        if(msg.author.bot) return; //Ignore messages from self

        //Split into array of arguments (for easier parsing later on)
        let args = msg.content.toLowerCase().split(" ");

        if (msg.mentions.has(Opossum.user!) && msg.content[msg.content.length - 1] == "?") {
			msg.reply("???")
		}

        await commands.userCommands(msg, args);

    } catch (e) {
        console.error(e);
    }
});
