export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Simpan data di Vercel KV atau database lain
        // Untuk testing, return dummy data
        const dummyDonations = [
            {
                donator_name: "Test User",
                amount: 10000,
                timestamp: new Date().toISOString()
            }
        ];
        
        res.status(200).json(dummyDonations);
    } catch (err) {
        res.status(200).json([]);
    }
}
