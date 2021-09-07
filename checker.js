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
        var lastid;
        var test = 50;
        while (true) {
            lastid = id;
            id = await conn.query('SELECT parentID FROM comments WHERE ID = "' + id + '"');
            id = id[0].parentID;
            if ((typeof id) != "string")
                throw ('incontinuity @ ' + lastid + '\nparentID is ' + id)
            test--;
            if (test <= 0) 
                throw 'test complete without issues'
        }
    } catch (err) {
        console.error(err);
        process.abort();
    }
}
