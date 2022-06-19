/*
*   startup utilities for OpossumBot_2
*/


// Node imports
import { sys as ping } from 'ping';
import { resolve } from 'path';
const pjson = require(resolve(process.cwd(), 'package.json'));

export function argvPrint(argv: any){
    console.log("Verbose? " + argv.v);
}

/*
* This function does not properly AWAIT for the ping report to finish before going to the 
* next task
*/
export function pingFunction(host: string[]){
    host.forEach(element => {
        const pStart = Date.now();
        ping.probe(element, function(isAlive){
            let pFinish = Date.now();
            let pReport = pFinish - pStart;
            let activePing = isAlive ? element + ' is alive... report: ' + pReport + 'ms' : 'host ' + host + ' is dead';
            console.log(activePing);
        });
    });
}

export function printPackageInfo(){
    console.log(pjson['dependencies']);
}
