import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Jadwal() {
    const [jadwalList, setJadwalList] = useState([]);
    const [formData, setFormData] = useState({
        kode_matkul: '',
        nama_matkul: '',
        dosen: '',
        hari: '',
        waktu_mulai: '',
        waktu_selesai: '',
        ruang: ''
    });
    
    const [editId, setEditId] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [token, navigate]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost/jadwal', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJadwalList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response && error.response.status === 401) {
                navigate('/');
            }
        }
    };

    // Fungsi untuk menangani perubahan form, submit, edit, delete, dll.

    const resetForm = () => {
        setFormData({
            kode_matkul: '',
            nama_matkul: '',
            dosen: '',
            hari: '',
            waktu_mulai: '',
            waktu_selesai: '',
            ruang: ''
        });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            // Update jadwal
            try {
                await axios.put(`https://localhost/jadwal/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchData();
                resetForm();
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {
            // Tambah jadwal
            try {
                await axios.post('https://localhost/jadwal', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchData();
                resetForm();
            } catch (error) {
                console.error('Error adding data:', error);
            }
        }
    };

    const handleEdit = (jadwal) => {
        setFormData({
            kode_matkul: jadwal.kode_matkul,
            nama_matkul: jadwal.nama_matkul,
            dosen: jadwal.dosen,
            hari: jadwal.hari,
            waktu_mulai: jadwal.waktu_mulai,
            waktu_selesai: jadwal.waktu_selesai,
            ruang: jadwal.ruang
        });
        setEditId(jadwal.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await axios.delete(`https://localhost/jadwal/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchData();
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="jadwal-container">
            <Navbar />
            <h2>Data Jadwal Kuliah</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields untuk data jadwal */}
                {/* Mirip dengan form di Mahasiswa.jsx */}
                <input
                    type="text"
                    name="kode_matkul"
                    value={formData.kode_matkul}
                    onChange={handleChange}
                    placeholder="Kode Mata Kuliah"
                    required
                />
                <input
                    type="text"
                    name="nama_matkul"
                    value={formData.nama_matkul}
                    onChange={handleChange}
                    placeholder="Nama Mata Kuliah"
                    required
                />
                <input
                    type="text"
                    name="dosen"
                    value={formData.dosen}
                    onChange={handleChange}
                    placeholder="Dosen"
                    required
                />
                <input
                    type="text"
                    name="hari"
                    value={formData.hari}
                    onChange={handleChange}
                    placeholder="Hari"
                    required
                />
                <input
                    type="text"
                    name="waktu_mulai"
                    value={formData.waktu_mulai}
                    onChange={handleChange}
                    placeholder="Waktu Mulai"
                    required
                />
                <input
                    type="text"
                    name="waktu_selesai"
                    value={formData.waktu_selesai}
                    onChange={handleChange}
                    placeholder="Waktu Selesai"
                    required
                />
                <input
                    type="text"
                    name="ruang"
                    value={formData.ruang}
                    onChange={handleChange}
                    placeholder="Ruang"
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Kode Matkul</th>
                        <th>Nama Matkul</th>
                        <th>Dosen</th>
                        <th>Hari</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Ruang</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jadwalList.map((jadwal) => (
                        <tr key={jadwal.id}>
                            <td>{jadwal.kode_matkul}</td>
                            <td>{jadwal.nama_matkul}</td>
                            <td>{jadwal.dosen}</td>
                            <td>{jadwal.hari}</td>
                            <td>{jadwal.waktu_mulai}</td>
                            <td>{jadwal.waktu_selesai}</td>
                            <td>{jadwal.ruang}</td>
                            <td>
                                <button onClick={() => handleEdit(jadwal)}>Edit</button>
                                <button onClick={() => handleDelete(jadwal.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Jadwal;
