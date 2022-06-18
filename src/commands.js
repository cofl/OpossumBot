/*
* File containing the commands source for Opossumbot_2
* Author: contrastellar (Gabriella Agathon, 2022)
*/

const fs = require('fs');
const mysql = require('mysql2');

/**
 * This section uses two files "user" and "mysql", to allow
 * 'secure' connections to my database.
 */
dbURL = fs.readFileSync("./db.url", "utf8").replace("\n", "");
dbUser = fs.readFileSync("./user.pass", "utf8").replace("\n", "");
dbPass = fs.readFileSync("./mysql.pass", "utf8").replace("\n", "");

/**
 * This assures there's a session, so that way there's
 * no need to declare USE OpossumBot every time you want a specific
 * table --
 * Parsed as a JSON object
 */
let connectionInfo = {
    host: dbURL,
    user: dbUser,
    password: dbPass,
}

var connection = mysql.createConnection(connectionInfo);

connectionInfo, dbUser, dbPass = null;  // Clears out the informationt that's otherwise stored in plaintext
                                        // In theory the info's saved in the connection variable, but it may be hashed instead of just sitting as plaintext

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

async function userCommands(msg, args){
    //TODO This can be set up as a switch case that links to other functions as well, this would probably be easier and allow some kind of automation

     /**
     * @Command: git
     * links back to the github repo
     */
    if(args[0] === "!git"){
        msg.reply("https://github.com/Contrastellar/OpossumBot");
    }

    /**
     * @command: possum
     * Fetches an opossum
     *  from the db, attaches
     * alt text, sends the message
     */
    if(args[0] === "!possum"){
        // Need to grab number of opossums first
        let opossumCount;
        connection.query("SELECT count(Picture) from OpossumPictures;", function(err, results, fields){
            console.log(results);
        });
        msg.reply("Sorry, this feature isn't implemented yet!\nDebug: Opossum Count --> " + opossumCount);
    }
    
    //TODO both stroll and crypto need to be added to the db as blobs

    /**
     * @command: stroll
     * https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov
     */
    if(args[0] === "!stroll"){
        msg.reply("https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov");
    }

    /**
     * @command: crypto
     * https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4
     */
    if(args[0] === "!crypto"){
        msg.reply("https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4");
    }

    /**
     * @command: vibe
     * https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4
     */
    if(args[0] === "!vibe"){
        msg.reply("https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4");
    }

    /**
     * @command: wheel
     * "https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4"
     */
    if(args[0] === "!wheel"){
        msg.reply("https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4");
    }
    
    /**
     * @command: metar
     * could be a fun command to fetch data from the NWS/NOAA
     */
    if(args[0] === "!metar"){
        msg.reply("???");
    }
}

module.exports = { userCommands };
