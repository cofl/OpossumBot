/*
*   startup utilities for OpossumBot_2
*/

// Node imports
const Ping = require("ping");

function argvPrint(argv){
    argv.forEach((val, index) =>{
        console.log(`${index}: ${val}`)
    });
}

function pingFunction(host){
    host.forEach(element => {
        const pStart = Date.now();
        Ping.sys.probe(element, function(isAlive){
            let pFinish = Date.now();
            let pReport = pFinish - pStart;
            let activePing = isAlive ? element + ' is alive... report: ' + pReport + 'ms' : 'host ' + host + ' is dead';
            console.log(activePing);
        });
    });

}

module.exports = { pingFunction, argvPrint };
