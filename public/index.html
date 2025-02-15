<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Donations</title>
    <style>
        .donations-container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .donation-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem;
            margin: 0.5rem 0;
            background: white;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="donations-container">
        <h2>Recent Donations</h2>
        <div id="donations-list"></div>
    </div>

    <script>
        async function loadDonations() {
            try {
                const response = await fetch('/api/donations');
                const donations = await response.json();
                
                const html = donations.map(d => `
                    <div class="donation-item">
                        <span>${d.donator_name}</span>
                        <span>Rp${Number(d.amount).toLocaleString('id')}</span>
                        <small>${new Date(d.timestamp).toLocaleString('id')}</small>
                    </div>
                `).join('');
                
                document.getElementById('donations-list').innerHTML = 
                    html || '<p>No donations yet</p>';
            } catch (err) {
                console.error('Failed to load donations:', err);
            }
        }

        // Update every 30 seconds
        setInterval(loadDonations, 30000);
        loadDonations();
    </script>
</body>
</html>
