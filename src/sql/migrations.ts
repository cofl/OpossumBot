import { sync as glob } from 'glob'
import { log, info } from 'console'
import { resolve } from 'path/posix'
import { sql, rawDB, addImages } from './index'

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
    await sql`
        create or replace function random_image()
        returns table(
            id int,
            created timestamp,
            added_by bigint,
            image bytea
        )
        language plpgsql as $$
        declare image_count int;
        begin
            select count(possum_images.id) into image_count from possum_images;
            return query select
                possum_images.id,
                possum_images.created,
                possum_images.added_by,
                possum_images.image
            from possum_images
            offset FLOOR(RANDOM() * image_count)
            limit 1;
        end;
        $$;
    `
}
export async function populateDefaultImages(){
    log('Initializing Database: adding default images.')
    const files = glob(`${resolve(__dirname, '../../resources/images')}/**/*`)
        .map(path => ({ path }))
    await addImages(files)
}
