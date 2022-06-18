/*
*   startup utilities for OpossumBot_2
*/


// Node imports
const Ping = require("ping");
const Process = require("process");
const pjson = require(Process.cwd() + "/package.json");

function argvPrint(argv){
    console.log("Verbose? " + argv.v);
}

/*
* This function does not properly AWAIT for the ping report to finish before going to the 
* next task
*/
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

function printPackageInfo(){
    console.log(pjson['dependencies']);
}

module.exports = { pingFunction, argvPrint, printPackageInfo };
