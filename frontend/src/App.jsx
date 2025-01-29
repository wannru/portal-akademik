// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Mahasiswa from './components/Mahasiswa';
import Jadwal from './components/Jadwal';
import Nilai from './components/Nilai';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mahasiswa" element={token ? <Mahasiswa /> : <Navigate to="/"/>} />
        <Route path="/jadwal" element={token ? <Jadwal /> : <Navigate to="/" />} /> 
        <Route path="/Nilai" element={token ? <Nilai /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
