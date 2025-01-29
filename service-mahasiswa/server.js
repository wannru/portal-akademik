// server.js
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// routes
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
app.use('/mahasiswa', mahasiswaRoutes);

const PORT = process.argv[2] || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});