const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Elvina@78910',
    database: 'HotelReservationDB'
});

const promisePool = pool.promise();
module.exports = promisePool;