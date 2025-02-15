export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const donation = req.body;
        
        if (!donation?.donator_name || !donation?.amount) {
            return res.status(400).json({ 
                error: 'Invalid donation data',
                received: donation 
            });
        }

        // Simpan donasi (implementasi sesuai database yang digunakan)
        console.log('Received donation:', donation);

        res.status(200).json({
            success: true,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
