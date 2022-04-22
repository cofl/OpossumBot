/*
* File containing the commands source for Opossumbot_2
* Author: contrastellar (Gabriella Agathon, 2022)
*/
const fs = require('fs');
const mysql = require('mysql');

/**
 * This section uses two files "user" and "mysql", to allow
 * 'secure' connections to my database.
 */
const dbURL = fs.readFileSync("./db.url", "utf8").replace("\n", "");
const dbUser = fs.readFileSync("./user.pass", "utf8").replace("\n", "");
const dbPass = fs.readFileSync("./mysql.pass", "utf8").replace("\n", "");

var connection = mysql.createConnection({
    host: dbURL,
    user: dbUser,
    password: dbPass,
    database: "OpossumBot"
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

async function userCommands(msg, args){
    //TODO add user commands

     /**
     * !git
     * links back to the github repo
     */
    if(args[0] === "!git"){
        msg.reply("https://github.com/Contrastellar/OpossumBot");
    }

    /**
     * !possum
     * Fetches an opossum from the db, attaches
     * alt text, sends the message
     */
    if(args[0] === "!possum"){
        msg.reply("Sorry, this feature isn't implemented yet!");
    }
    
    //TODO both stroll and crypto need to be added to the db as blobs

    /**
     * !stroll
     * https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov
     */
    if(args[0] === "!stroll"){
        msg.reply("https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov");
    }

    /**
     * !crypto
     * https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4
     */
    if(args[0] === "!crypto"){
        msg.reply("https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4");
    }

    /**
     * !vibe
     * https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4
     */
    if(args[0] === "!vibe"){
        msg.reply("https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4");
    }

    /**
     * !wheel
     * "https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4"
     */
    if(args[0] === "!wheel"){
        msg.reply("https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4");
    }
    
    /**
     * !metar
     * could be a fun command to fetch data from the NWS/NOAA
     */
}

module.exports = { userCommands };
