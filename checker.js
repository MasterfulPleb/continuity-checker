'use strict';
const mariadb = require('mariadb');
const start = 'hbxr2az'; //ID of starting comment

main();

async function main() {
    /** @type {Promise<mariadb.Connection>} */
    var conn;
    try {
        //connects to MariaDB
        conn = await mariadb.createConnection({
            socketPath: '/var/run/mysqld/mysqld.sock',
            user: 'root',
            database: 'bee_movie'
        });
        var id = start;
        while (true) {
            var parentID = await conn.query('SELECT parentID FROM comments WHERE ID = "' + id + '"');
            console.log(parentID);
            throw 'done'
            //var parent_id = 
        }
    } catch (err) {
        console.log(err);
    }
}
