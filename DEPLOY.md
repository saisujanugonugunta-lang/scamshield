# ScamShield — Deploy Package

This package combines the ScamShield React/Vite frontend and Node/Express backend.

## Recommended: one Render Web Service

The backend serves the built frontend, so you only need **one public service**.

### 1. Upload to GitHub
Create a new private/public repository and upload this whole folder.

### 2. Create the Render service
Use **Web Service** and select the repository.

- Runtime: Node
- Build command: `npm run install:all && npm run build`
- Start command: `npm start`

A `render.yaml` is included if you use Blueprint deployment.

### 3. Environment variables
In Render, add:

- `GEMINI_API_KEY` — optional; enables Gemini analysis. Without it, the local heuristic analyzer still works.
- `FIREBASE_SERVICE_ACCOUNT_JSON` — optional; paste your Firebase service-account JSON as one line to enable Firestore.
- `FRONTEND_URL` — set to your deployed URL, e.g. `https://scamshield.onrender.com`.

**Never put Firebase service-account JSON or Gemini secrets in `frontend/.env` or commit them to GitHub.**

### 4. Firebase (optional)
If using reports/history:
1. Create/select a Firebase project.
2. Enable Firestore.
3. Firebase Console → Project settings → Service accounts → Generate new private key.
4. Copy the JSON into Render's `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable.
5. Deploy/redeploy.

The backend creates:
- `scans`
- `reports`

### 5. Test after deployment
Open:
- `/health` — should return JSON with `ok: true`
- `/` — ScamShield API status
- `/` in a browser — the React app

### API
- `POST /api/analyze`
- `POST /api/reports`

The frontend is already wired to call these same-origin endpoints in production.

## Local test

From the project root:

```bash
npm run install:all
npm run build
npm start
```

Then open `http://localhost:5000`.

For development, run frontend and backend separately:
- backend: `cd backend && npm install && npm run dev`
- frontend: `cd frontend && npm install && npm run dev`

If frontend/backend run on different ports locally, set `VITE_API_URL` in `frontend/.env` to the backend URL.

## Important production note

The analysis result screen is still primarily the designed/demo UI. The real `/api/analyze` call is now connected and its result is stored in `sessionStorage`; if you want the entire result page to render every returned signal dynamically, that is a separate UI enhancement.
