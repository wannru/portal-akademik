// controllers/nilaiController.js
const db = require('../models/db');

// Mendapatkan semua nilai
exports.getAllNilai = (req, res) => {
  const sql = 'SELECT * FROM nilai';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error saat mendapatkan data nilai:', err);
      res.status(500).send('Gagal mendapatkan data nilai');
    } else {
      res.json(results);
    }
  });
};

// // Mendapatkan nilai berdasarkan ID

// exports.getNilaiById = (req, res) => {
//   const { id } = req.params;
//   const sql = 'SELECT * FROM nilai WHERE id = ?';
//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       console.error('Error saat mendapatkan data nilai:', err);
//       res.status(500).send('Gagal mendapatkan data nilai');
//     } else {
//       res.json(results[0]);
//     }
//   });
// };

// Menambahkan nilai baru
exports.createNilai = (req, res) => {
  const { id_mahasiswa, id_matkul, nilai } = req.body;
  const sql = 'INSERT INTO nilai (id_mahasiswa, id_matkul, nilai) VALUES (?, ?, ?)';
  db.query(sql, [id_mahasiswa, id_matkul, nilai], (err, result) => {
    if (err) {
      console.error('Error saat menambahkan nilai:', err);
      res.status(500).send('Gagal menambahkan nilai');
    } else {
      res.status(201).send('Nilai berhasil ditambahkan');
    }
  });
};

// Memperbarui nilai
exports.updateNilai = (req, res) => {
  const { id } = req.params;
  const { id_mahasiswa, id_matkul, nilai } = req.body;
  const sql = 'UPDATE nilai SET id_mahasiswa = ?, id_matkul = ?, nilai = ? WHERE id = ?';
  db.query(sql, [id_mahasiswa, id_matkul, nilai, id], (err, result) => {
    if (err) {
      console.error('Error saat memperbarui nilai:', err);
      res.status(500).send('Gagal memperbarui nilai');
    } else {
      res.send('Nilai berhasil diperbarui');
    }
  });
};

// Menghapus nilai
exports.deleteNilai = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM nilai WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error saat menghapus nilai:', err);
      res.status(500).send('Gagal menghapus nilai');
    } else {
      res.send('Nilai berhasil dihapus');
    }
  });
};
