import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Handle both JSON and URL-encoded form data
        const donation = {
            donator_name: req.body.donator_name || req.query.donator_name,
            amount: req.body.amount || req.query.amount,
            message: req.body.message || req.query.message || '-'
        };

        if (!donation.donator_name || !donation.amount) {
            return res.status(400).json({ error: 'Invalid donation data' });
        }

        const STORAGE_PATH = join(process.cwd(), 'data', 'donations.json');
        
        // Read existing donations
        let donations = [];
        try {
            const data = await readFile(STORAGE_PATH, 'utf8');
            donations = JSON.parse(data);
        } catch (err) {
            // File doesn't exist or is invalid, start fresh
        }

        // Add new donation
        donations.push({
            ...donation,
            timestamp: new Date().toISOString()
        });

        // Save updated donations
        await writeFile(STORAGE_PATH, JSON.stringify(donations, null, 2));

        res.status(200).json({
            success: true,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
