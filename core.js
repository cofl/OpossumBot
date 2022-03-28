/*
*   OpossumBot_2
*   Author: contrastellar (Gabriella Agathon)
*/

// Node imports
import Chalk from "chalk";
import Discord from "discord.js";
import fs from "fs";
//import Ping from "ping";

const config = require("./src/config.js");
config.configure();

const misc = require("./src/misc.js");
const commands = require("./src/commands.js");

const discordToken = fs.readFileSync("./discord.token", "utf8").replace("\n", "");

const updateCacheEvery = 500;
let numMessages = 0;
let mainGuild = null;

const Opossum = new Discord.Client({
    ws: { intents: new Discord.Intents(Discord.Intents.ALL)},
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

console.log(chalk.greenBright("Starting Here"));
console.log(chalk.green('Logged in')+ ` as `+chalk.blue(`${client.user.tag}!`));
console.log('Console '+chalk.cyan('START'));
const bootStart = Date.now();
//makes sure you're connected
const ping = require('ping');
//the hosts to test the ping for. this can be any viable host, however for the baseline, I've just used Google + Discord
const hosts = ['google.com', 'discordapp.com'];

const startup = require("./src/startup.js");
startup.pingFunction(hosts);

console.log("Startup");
Opossum.login(discordToken).catch(function (reason){
    console.log(reason);
});

//Heavily inspired by TeddyBot by @tomorrow_nf

Opossum.on('ready', async () => {
    Opossum.setMaxListeners(0);
    await Opossum.user.setActivity("aaaaaaa! <3");
    console.log('Startup complete!');

});

Opossum.on('message', async msg => {
    try {
        if(msg.author.bot) return; //Ignore self-messages

        //Split into array of arguments (for easier parsing later on)
        let args = message.content.toLowerCase().split(" ");

    } catch (e) {
        console.error(e);
    }
});
