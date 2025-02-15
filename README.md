# My Bio - Webhook Server

Webhook server for handling Saweria donations.

## Setup

```bash
cd webhook-server
npm install
npm start
```

## Testing

```bash
curl -X POST ^
-H "Content-Type: application/json" ^
-d "{\"donator_name\":\"Test\",\"amount\":10000}" ^
http://localhost:3000/webhook-saweria
```

## Endpoints

- `POST /webhook-saweria` - Receive donations
- `GET /api/donations` - Get recent donations
