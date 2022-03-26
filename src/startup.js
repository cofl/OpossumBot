/*
*   startup utilities for OpossumBot_2
*/

import Ping from "ping";

function pingFunction(host){
    host.array.forEach(element => {
        const pStart = Date.now();
        Ping.sys.probe(host, function(isAlive){
            let pFinish = Date.now();
            let activePing = isAlive ? chalk.grah(host) + ' is alive... report: ' + pReport + 'ms' : 'host ' + host + ' is dead';
            let pReport = pFinish - pStart;
        });
    });

}
