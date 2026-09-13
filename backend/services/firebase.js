import admin from "firebase-admin";

let db = null;

export function initFirebase() {
  if (admin.apps.length) {
    db = admin.firestore();
    return true;
  }

  let credential;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    credential = admin.credential.cert(serviceAccount);
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    credential = admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    });
  } else {
    return false;
  }

  admin.initializeApp({ credential });
  db = admin.firestore();
  return true;
}

export async function saveScan(data) {
  if (!db) return null;
  const ref = await db.collection("scans").add(data);
  return ref.id;
}

export async function saveReport(data) {
  if (!db) throw new Error("Firebase is not configured");
  const ref = await db.collection("reports").add(data);
  return ref.id;
}
