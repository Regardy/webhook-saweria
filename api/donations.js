import { readFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const STORAGE_PATH = join(process.cwd(), 'data', 'donations.json');
        const data = await readFile(STORAGE_PATH, 'utf8');
        const donations = JSON.parse(data);
        
        // Return last 5 donations, newest first
        res.status(200).json(donations.slice(-5).reverse());
    } catch (err) {
        res.status(200).json([]);
    }
}
