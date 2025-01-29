const express = require('express');
const app = express();
const cors = require('cors');

// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// routes
const jadwalRoutes = require('./routes/jadwalRoutes');
app.use('/jadwal', jadwalRoutes);

const PORT = process.argv[2] || 3002;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});