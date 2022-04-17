/*
*   OpossumBot_2 bot core
*   Author: contrastellar (Gabriella Agathon)
*/

/**
 * Version number definition (need to setup for import from package.json)
 */
const VERSION = "PRERELEASE";

/**
 * NPM packages
 */
const Discord = require("discord.js");
const fs = require("fs");
const { argv } = require("process");

/**
 * Import yargs and configure
 */
require("yargs").scriptName("opossumbot")
.usage('$0 <cmd> [args]')
.help()
.argv;

/**
 * add file dependancies
 */
const startup = require('./src/startup.js');
const misc = require("./src/misc.js");
const commands = require("./src/commands.js");
const config = require("./src/config.js");

/**
 * Parse command line arguments (for debug states)
 */
const debugState = argv[2];
if(debugState === "TRUE"){
    startup.argvPrint(argv);
}

config.configure();

const discordToken = fs.readFileSync("./discord.token", "utf8").replace("\n", "");

let hosts = ['google.com', 'discordapp.com'];
startup.pingFunction(hosts);

const updateCacheEvery = 500;
let numMessages = 0;
let mainGuild = null;

const Opossum = new Discord.Client({ 
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

// Log into Discord using /info/DiscordToken.txt
console.log("Time to log in.");
Opossum.login(discordToken).catch(function (reason) {
	console.log(reason);
});

console.log("Starting here");
console.log("OpossumBot v."+ VERSION +" running");

Opossum.on('ready', async () => {
    Opossum.setMaxListeners(0);
    Opossum.user.setActivity("Now updated to v." + VERSION);
    console.log('Startup complete!');

});

Opossum.on('messageCreate', async msg => {
    try {
        if(msg.author.bot) return; //Ignore messages from self

        //Split into array of arguments (for easier parsing later on)
        let args = msg.content.toLowerCase().split(" ");

        if (msg.mentions.has(Opossum.user) && msg.content[msg.content.length - 1] == "?") {
			msg.reply("???")
		}

        await commands.userCommands(msg, args);

    } catch (e) {
        console.error(e);
    }
});
