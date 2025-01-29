// src/components/Mahasiswa.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Mahasiswa() {
    const [mahasiswaList, setMahasiswaList] = useState([]);
    const [formData, setFormData] = useState({
        nim: '',
        nama: '',
        jurusan: '',
        status: 'aktif',
    });

    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [token, navigate]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost/mahasiswa', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMahasiswaList(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response && error.response.status === 401) {
                navigate('/');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nim: '',
            nama: '',
            jurusan: '',
            status: 'aktif',
        });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            // Update data mahasiswa
            try {
                await axios.put(`https://localhost/mahasiswa/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchData();
                resetForm();
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {
            // Tambah data mahasiswa
            try {
                await axios.post('https://localhost/mahasiswa', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchData();
                resetForm();
            } catch (error) {
                console.error('Error adding data:', error);
            }
        }
    };

    const handleEdit = (mahasiswa) => {
        setFormData({
            nim: mahasiswa.nim,
            nama: mahasiswa.nama,
            jurusan: mahasiswa.jurusan,
            status: mahasiswa.status,
        });
        setEditId(mahasiswa.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await axios.delete(`https://localhost/mahasiswa/${id}`, {
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
        <div className="mahasiswa-container">
            <Navbar />
            <h2>Data Mahasiswa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>NIM:</label><br />
                    <input type="text" name="nim" value={formData.nim} onChange={handleChange} required />
                </div>
                <div>
                    <label>Nama:</label><br />
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                </div>
                <div>
                    <label>Jurusan:</label><br />
                    <input type="text" name="jurusan" value={formData.jurusan} onChange={handleChange} required />
                </div>
                <div>
                    <label>Status:</label><br />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="aktif">Aktif</option>
                        <option value="non-aktif">Non-Aktif</option>
                    </select>
                </div>
                <button type="submit">{editId ? 'Update' : 'Tambah'}</button>
                {editId && <button type="button" onClick={resetForm}>Batal</button>}
            </form>

            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Jurusan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswaList.map((mahasiswa) => (
                        <tr key={mahasiswa.id}>
                            <td>{mahasiswa.nim}</td>
                            <td>{mahasiswa.nama}</td>
                            <td>{mahasiswa.jurusan}</td>
                            <td>{mahasiswa.status}</td>
                            <td>
                                <button onClick={() => handleEdit(mahasiswa)}>Edit</button>
                                <button onClick={() => handleDelete(mahasiswa.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Mahasiswa;
