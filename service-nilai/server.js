// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// Routes
const nilaiRoutes = require('./routes/nilaiRoutes');
app.use('/nilai', nilaiRoutes);

// Menjalankan server
const PORT = process.argv[2] || 3003; // Pastikan port ga bentrok
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
