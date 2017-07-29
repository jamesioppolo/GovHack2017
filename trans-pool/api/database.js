var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'transpool',
    password: 'transpool',
    database: 'transpool',
    debug: false
});

module.exports = {
    'pool': pool,
    'users_table': 'users'
};
