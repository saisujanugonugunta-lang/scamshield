# ScamShield Backend

Backend API for the uploaded ScamShield Vite/React frontend.

## What it provides

- `GET /health` — health check
- `POST /api/analyze` — analyzes a job/recruitment message
- `POST /api/reports` — stores community scam reports in Firestore when Firebase Admin is configured
- Optional Gemini analysis
- Firestore collections: `scans` and `reports`

## 1. Install

```bash
npm install
```

## 2. Configure

Copy `.env.example` to `.env`.

For Firebase, create a Firebase service-account key from:
Firebase Console → Project settings → Service accounts → Generate new private key.

For local testing, you can put the JSON into `FIREBASE_SERVICE_ACCOUNT_JSON` as one line.

IMPORTANT: Never commit `.env` or the service-account JSON to GitHub.

For Gemini, add your Gemini API key to `GEMINI_API_KEY`. If it is missing, the backend still works with the built-in heuristic engine.

## 3. Run

```bash
npm run dev
```

The default API URL is:

`http://localhost:5000`

## 4. Test

Open:

`http://localhost:5000/health`

Example request:

```json
{
  "message": "Pay ₹1999 to confirm your job within 2 hours",
  "source": "text"
}
```

POST it to `/api/analyze`.

## 5. Connect the frontend

In `CheckOfferPage.tsx`, replace the current navigation-only analysis handler with a fetch to:

`/api/analyze`

After the backend is deployed, set the frontend API base URL to your deployed backend URL.

## 6. Render deployment

- Create a new Web Service
- Upload/push this backend folder to GitHub
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from `.env.example`
- Deploy

Do not upload the Firebase service-account JSON file to GitHub.
