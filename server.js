import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const PORT = process.env.PORT || 3000;
const STORAGE_FILE = 'donations.json';

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50
});

// Initialize express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(limiter);
app.use(express.static('../public'));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Store donation
async function saveDonation(donation) {
    try {
        let donations = [];
        try {
            const data = await readFile(STORAGE_FILE, 'utf8');
            donations = JSON.parse(data);
        } catch (err) {
            // File doesn't exist, start fresh
        }

        donations.push({
            ...donation,
            timestamp: new Date().toISOString()
        });

        await writeFile(STORAGE_FILE, JSON.stringify(donations, null, 2));
        return true;
    } catch (err) {
        console.error('Storage error:', err);
        return false;
    }
}

// Webhook endpoint
app.post('/webhook-saweria', async (req, res) => {
    try {
        const donation = req.body;
        if (!donation?.donator_name || !donation?.amount) {
            return res.status(400).json({ error: 'Invalid donation data' });
        }

        const saved = await saveDonation(donation);
        if (!saved) {
            return res.status(500).json({ error: 'Failed to save donation' });
        }

        res.json({
            success: true,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get recent donations
app.get('/api/donations', async (req, res) => {
    try {
        const data = await readFile(STORAGE_FILE, 'utf8');
        const donations = JSON.parse(data);
        res.json(donations.slice(-5).reverse());
    } catch (err) {
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});
