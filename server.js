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
app.get('/api/donations', async (req, res) => {
    const donations = await Donation.find().sort({ created_at: -1 }); // Ambil data terbaru
    console.log('Data donasi dari database:', donations); // Log data dari database
    res.status(200).json(donations);
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
