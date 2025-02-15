const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Simpan data donasi di array (sementara)
let donations = [];

// Endpoint untuk webhook Saweria
app.post('/webhook/saweria', (req, res) => {
    const data = req.body;
    console.log('Data dari Saweria:', data);

    if (data.event === 'donation') {
        donations.push(data); // Tambahkan donasi ke array
        console.log('Donasi disimpan:', donations); // Log array donations
    }

    res.status(200).json({ message: 'Webhook received' });
});
// Endpoint untuk mendapatkan data donasi terbaru
app.get('/api/donations', (req, res) => {
    // Urutkan donasi berdasarkan waktu (terbaru pertama)
    const sortedDonations = donations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Kirim data donasi terbaru
    res.status(200).json(sortedDonations);
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
