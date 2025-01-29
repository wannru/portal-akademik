const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');
const authMiddleware = require('../middleware/authMiddleware');

// endpoint untuk mendapatkan semua data mahasiswa
router.get('/', authMiddleware.verifyToken, mahasiswaController.getAllMahasiswa );

// Endpoint menambahkan mahasiswa 
router.post('/', authMiddleware.verifyToken, mahasiswaController.createMahasiswa);

// Endpoint memperbarui mahasiswa
router.put('/:id', authMiddleware.verifyToken, mahasiswaController.updateMahasiswa);

// Endpoint menghapus mahasiswa
router.delete('/:id', authMiddleware.verifyToken, mahasiswaController.deleteMahasiswa);

const authController = require('../controllers/authController');
router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;