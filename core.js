/*
*   OpossumBot_2 bot core
*   Author: contrastellar (Gabriella Agathon)
*/

//Version number
const VERSION = "PRERELEASE";

// Node imports
const Discord = require("discord.js");
const fs = require("fs");
const { argv } = require("process");

// yargs
require("yargs").scriptName("opossumbot")
.usage('$0 <cmd> [args]')
.help()
.argv;


// Parse any command line arguments
const debugState = argv[2];
argv.forEach((val, index) =>{
    console.log(`${index}: ${val}`)
});

const config = require("./src/config.js");
config.configure();

const misc = require("./src/misc.js");
const commands = require("./src/commands.js");

const discordToken = fs.readFileSync("./discord.token", "utf8").replace("\n", "");

let hosts = ['google.com', 'discordapp.com'];
const startup = require('./src/startup.js');
startup.pingFunction(hosts);

const updateCacheEvery = 500;
let numMessages = 0;
let mainGuild = null;

const Opossum = new Discord.Client({ 
	intents: [Discord.Intents.FLAGS.GUILDS]
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

Opossum.on('message', async msg => {
    try {
        if(msg.author.bot) return; //Ignore messages from self

        //Split into array of arguments (for easier parsing later on)
        let args = message.content.toLowerCase().split(" ");

        if(message.mentions.has(Opossum.user) && message.content[message.content.length - 1] == "?"){
            msg.channel.reply(", why are you asking me?");
        }

        await commands.userCommands(message, args);

    } catch (e) {
        console.error(e);
    }
});
