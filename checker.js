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
        while (true) {
            lastid = id;
            id = await conn.query('SELECT parentID FROM comments WHERE ID = "' + id + '"');
            id = id[0].parentID;
            if ((typeof id[0].parentID) == "undefined")
                throw ('incontinuity @ ' + lastid + '\nparentID is undefined')
            if ((typeof id[0].parentID) != "string")
                throw ('incontinuity @ ' + lastid + '\nparentID is ' + id)
            if (id[0].parentID == "ofiegh")
                throw "done, no missing comments"
        }
    } catch (err) {
        console.error(err);
        process.abort();
    }
}
