const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { username, password } = req.body;

    // hash pw sebelum simpan ke db
    bcrypt.hash( password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).send('Gagal mendaftar');
        } else {
            const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query( sql, [username, hash], (err, result) => {
                if (err) {
                    console.error('Error saat mendaftar:', err);
                    res.status(500).send('Gagal mendaftar');
                } else {
                    res.status(201).send('Berhasil mendaftar');
                }
            });
        }
    });
};

const jwt = require('jsonwebtoken');
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query( sql, [username], (err, results) => {
        if (err) {
            console.error('Error saat login:', err);
            res.status(500).send('Gagal login');
        } else if(results.length === 0){
            res.status(401).send('Email atau password salah');
        } else {
            const user = results[0];
            console.log('result: ', results);

            // bandingkan password yang diinput dgn yg ada di db
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error saat membandingkan password:', err);
                    res.status(500).send('Gagal login');
                } else if(isMatch){
                    // generate token
                    const token = jwt.sign( {id: user.id, username: user.username}, 'secretkey', { expiresIn: '1h'} );
                    res.json({ token });
                } else {
                    res.status(401).send('Email atau password salah'); 
                }
            });
        }
    });
};