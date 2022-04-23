import { sql, rawDB } from "./sql"
import { log } from "console"

export function setupTeardown(){
    process.on('exit', () => {
        log("Exiting...")
        const timeout = 5 /* seconds */
        sql.end({ timeout })
        rawDB.end({ timeout })
    })
}
