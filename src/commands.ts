/*
* File containing the commands source for Opossumbot_2
* Author: contrastellar (Gabriella Agathon, 2022)
*/

import { Message } from 'discord.js';
import { readFileSync } from 'fs';
import mysql, { ConnectionOptions } from 'mysql2';

/**
 * This section uses two files "user" and "mysql", to allow
 * 'secure' connections to my database.
 */
const dbURL = readFileSync("./db.url", "utf8").replace("\n", "");
const dbUser = readFileSync("./user.pass", "utf8").replace("\n", "");
const dbPass = readFileSync("./mysql.pass", "utf8").replace("\n", "");

/**
 * This assures there's a session, so that way there's
 * no need to declare USE OpossumBot every time you want a specific
 * table --
 * Parsed as a JSON object
 */
let connectionInfo: ConnectionOptions = {
    host: dbURL,
    user: dbUser,
    password: dbPass,
}

const connection = mysql.createConnection(connectionInfo);

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    
    console.log('connected to the database as id ' + connection.threadId);
});

connection.query("USE OpossumBot;", function (error, results, fields){
    if (error) throw error;
    return;
});

export async function userCommands(msg: Message, args: string[]){
    //TODO This can be set up as a switch case that links to other functions as well, this would probably be easier and allow some kind of automation
     

    switch(args[0]){
        /**
         * @command: possum
         * Fetches an opossum
         *  from the db, attaches
         * alt text, sends the message
         */
        case "!possum":
            let query = "SELECT * from `OpossumPictures`;";
            connection.query(query, function(err, results, fields){
                console.log(results);
            });
        break;

        case "!count":
            // Need to grab number of opossums first
            let opossumCount = new Number;
            connection.query("SELECT count(Picture) as `count` from `OpossumPictures`;", function(err, results, fields){
                console.log((results as any[])[0].count);
                opossumCount = (results as any[])[0].count;
                msg.reply("Opossum Count -> " + opossumCount);
            });

        break;

        /**
         * @Command: git
         * links back to the github repo
         */
        case "!git":
            msg.reply("https://github.com/Contrastellar/OpossumBot");

        break;

        /**
         * @command: stroll
         * https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov
         */
        case "!stroll":

        break;

        /**
         * @command: crypto
         * https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4
         */
        case "!crypto":

        break;

        /**
         * @command: vibe
         * https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4
         */
        case "!vibe":

        break;

        /**
         * @command: wheel
         * "https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4"
         */
        case "!wheel":

        break;

        /**
         * @command: metar
         * could be a fun command to fetch data from the NWS/NOAA
         */
        case "!metar":

        break;

    }
}
    //TODO both stroll and crypto need to be added to the db as blobs
