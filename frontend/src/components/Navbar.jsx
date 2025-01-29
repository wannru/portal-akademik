import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav>
      <Link to="/mahasiswa">Mahasiswa  |</Link>
      <Link to="/jadwal">  Jadwal  |</Link>
      <Link to="/nilai">  Nilai  |</Link>
      <button onClick={handleLogout}>  Logout</button>
    </nav>
  );
}

export default Navbar;
