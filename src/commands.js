/*
* File containing the commands source for Opossumbot_2
* Author: contrastellar (Gabriella Agathon, 2022)
*/
const fs = require('fs');
let PREFIX = '!';

async function userCommands(command, args){
    //TODO add user commands

    /**
     * !git
     * links back to the github repo
     */

    /**
     * !possum
     * Fetches an opossum from the db, attaches
     * alt text, sends the message
     */
    
    //TODO both stroll and crypto need to be added to the db as blobs

    /**
     * !stroll
     * https://cdn.discordapp.com/attachments/743621304246206494/937426290296881163/video0-5_1.mov
     */

    /**
     * !crypto
     * https://cdn.discordapp.com/attachments/812580457719005206/926519160014516284/jpZySFGv8ZiWcX40.mp4
     */

    /**
     * !vibe
     * https://cdn.discordapp.com/attachments/547164475535523890/735923050696015903/1593712826771.mp4
     */

    /**
     * !wheel
     * "https://cdn.discordapp.com/attachments/161297309978591233/903331498294390794/video0_13.mp4"
     */

    /**
     * !metar
     * could be a fun command to fetch data from the NWS/NOAA
     */
}

module.exports = { userCommands };
