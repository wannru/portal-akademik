const mysql = require('mysql');

// koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'umb_db',
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:' + err.stack);
    } else {
        console.log('Terhubung ke database');
    }
});

module.exports = db;