const db = require('../models/db');

// get all
exports.getAllMahasiswa = (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error saat mendapatkan data mahasiswa:', err);
        res.status(500).send('Gagal mendapatkan data mahasiswa');
      } else {
        res.json(results);
      }
    });
  };

// tambah mahasiswa
exports.createMahasiswa = (req, res) => {
    const { nim, nama, jurusan, status } = req.body;
    const sql = 'INSERT INTO mahasiswa (nim, nama, jurusan, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [nim, nama, jurusan, status], (err, result) => {
      if (err) {
        console.error('Error saat menambahkan mahasiswa:', err);
        res.status(500).send('Gagal menambahkan mahasiswa');
      } else {
        res.status(201).send('Mahasiswa berhasil ditambahkan');
      }
    });
  };

// Memperbarui mahasiswa
exports.updateMahasiswa = (req, res) => {
    const { id } = req.params;
    const { nim, nama, jurusan, status } = req.body;
    const sql = 'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ?, status = ? WHERE id = ?';
    db.query(sql, [nim, nama, jurusan, status, id], (err, result) => {
      if (err) {
        console.error('Error saat memperbarui mahasiswa:', err);
        res.status(500).send('Gagal memperbarui mahasiswa');
      } else {
        res.send('Mahasiswa berhasil diperbarui');
      }
    });
  };

// Menghapus mahasiswa
exports.deleteMahasiswa = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mahasiswa WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error saat menghapus mahasiswa:', err);
        res.status(500).send('Gagal menghapus mahasiswa');
      } else {
        res.send('Mahasiswa berhasil dihapus');
      }
    });
  };