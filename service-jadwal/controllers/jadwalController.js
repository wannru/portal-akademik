const db = require('../models/db');

exports.getAllJadwal = (req, res) => {
  const sql = 'SELECT * FROM jadwal_kuliah';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error saat mendapatkan data jadwal:', err);
      res.status(500).send('Gagal mendapatkan data jadwal');
    } else {
      res.json(results);
    }
  });
}

exports.createJadwal = (req, res) => {
  const { kode_matkul, nama_matkul, dosen, hari, waktu_mulai, waktu_selesai, ruang } = req.body;
  const sql = 'INSERT INTO jadwal_kuliah (kode_matkul, nama_matkul, dosen, hari, waktu_mulai, waktu_selesai, ruang) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [kode_matkul, nama_matkul, dosen, hari, waktu_mulai, waktu_selesai, ruang], (err, result) => {
    if (err) {
      console.error('Error saat menambahkan jadwal:', err);
    } else {
      res.status(201).send('Jadwal berhasil ditambahkan');
    }
  });
};

exports.updateJadwal = (req, res) => {
  const { id } = req.params;
  const { kode_matkul, nama_matkul, dosen, hari, waktu_mulai, waktu_selesai, ruang } = req.body;
  const sql = 'UPDATE jadwal_kuliah SET kode_matkul = ?, nama_matkul = ?, dosen = ?, hari = ?, waktu_mulai = ?, waktu_selesai = ?, ruang = ? WHERE id = ?';
  db.query(sql, [kode_matkul, nama_matkul, dosen, hari, waktu_mulai, waktu_selesai, ruang, id], (err, result) => {
    if (err) {
      console.error('Error saat memperbarui jadwal:', err);
      res.status(500).send('Gagal memperbarui jadwal');
    } else {
      res.send('Jadwal berhasil diperbarui');
    }
  });
};

exports.deleteJadwal = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM jadwal_kuliah WHERE  id = ?'; 
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error saat menghapus jadwal:', err);
      res.status(500).send('Gagal menghapus jadwal');
    } else {
      res.send('Jadwal berhasil dihapus');
    }
  });
};