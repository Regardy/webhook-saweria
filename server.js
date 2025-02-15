const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint untuk webhook Saweria
app.post('/webhook/saweria', (req, res) => {
    // Handle data dari webhook
    const data = req.body;
    console.log('Data dari Saweria:', data);

    // Lakukan sesuatu dengan data donasi
    if (data.event === 'donation') {
        console.log(`Donasi diterima: ${data.amount} dari ${data.donator_name}`);
    }

    res.status(200).json({ message: 'Webhook received' });
});

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
