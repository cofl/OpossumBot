/*
 *  startup utilities for OpossumBot_2
 */
import { log } from 'console';
import { promise } from 'ping';
const { probe } = promise;

import { Temporal } from '@js-temporal/polyfill';

export function dumpArgv(argv: string[]){
    for(const [index, value] of argv.entries())
        log(`${index}: ${value}`);
}

export async function ping(hosts: string[]): Promise<boolean> {
    const results = await Promise.all(hosts.map(async host => {
        const start = Temporal.Now.instant()
        const { alive } = await probe(host);
        const end = Temporal.Now.instant();
        const duration = Temporal.Duration.from({
            microseconds: Number(end.epochMicroseconds - start.epochMicroseconds)
        });
        const activePing = alive
            ? `${host} is alive... report: ${duration.toString({ smallestUnit: "microsecond" })}`
            : `host ${host} is dead`;
        log(activePing);
        return alive
    }))
    return results.reduce((r, c) => r && c, true)
}
