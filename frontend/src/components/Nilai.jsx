import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

function Nilai() {
  const [nilaiList, setNilaiList] = useState([]);
  const [formData, setFormData] = useState({
    id_mahasiswa: '',
    id_matkul: '',
    nilai: ''
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
      const response = await axios.get('https://localhost/nilai', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNilaiList(response.data);
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
      id_mahasiswa: '',
      id_matkul: '',
      nilai: ''
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // Update nilai
      try {
        await axios.put(`https://localhost/nilai/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
        resetForm();
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } else {
      // Tambah nilai
      try {
        await axios.post('https://localhost/nilai', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
        resetForm();
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  };

  const handleEdit = (nilai) => {
    setFormData({
      id_mahasiswa: nilai.id_mahasiswa,
      id_matkul: nilai.id_matkul,
      nilai: nilai.nilai
    });
    setEditId(nilai.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`https://localhost/nilai/${id}`, {
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
    <div className="nilai-container">
      <Navbar />  
      <h2>Data Nilai Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields untuk data nilai */}
        {/* Termasuk dropdown untuk memilih mahasiswa dan mata kuliah jika diperlukan */}
        <input
            type='text'
            name='id_mahasiswa'
            value={formData.id_mahasiswa}   
            onChange={handleChange}
            placeholder='ID Mahasiswa'
            required
        />
        <input
            type='text'
            name='id_matkul'
            value={formData.id_matkul}
            onChange={handleChange}
            placeholder='ID Mata Kuliah'
            required
        />
        <input
            type='text'
            name='nilai'
            value={formData.nilai}
            onChange={handleChange}
            placeholder='Nilai'
            required
        />
        <button type='submit'>Submit</button>
      </form>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID Mahasiswa</th>
            <th>ID Matkul</th>
            <th>Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {nilaiList.map((nilai) => (
            <tr key={nilai.id}>
              <td>{nilai.id_mahasiswa}</td>
              <td>{nilai.id_matkul}</td>
              <td>{nilai.nilai}</td>
              <td>
                <button onClick={() => handleEdit(nilai)}>Edit</button>
                <button onClick={() => handleDelete(nilai.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Nilai;
