import { sync as glob } from 'glob'
import { log, info } from 'console'
import { resolve } from 'path/posix'
import { sql, addImage, rawDB } from './index'

export async function initializeDB(){
    log('Initializing Database: creating tables.')
    const { POSTGRES_DATABASE } = process.env
    if(!POSTGRES_DATABASE)
        throw new Error("Cannot initialize DB! Missing POSTGRES_DATABASE.")
    const [ exists ] = await rawDB`select 1 from pg_database where datname = ${ POSTGRES_DATABASE }`
    if(!exists)
        await rawDB`create database db;`
    await sql`
        create table if not exists
        possum_images (
            id serial primary key,
            hash bigint unique not null,
            created timestamp not null,
            added_by bigint,
            image bytea not null
        );
    `
}
export async function populateDefaultImages(){
    log('Initializing Database: adding default images.')
    const files = glob(`${resolve(__dirname, '../../resources/images')}/**/*`)
    for(const path of files){
        await addImage({ path })
    }
}
