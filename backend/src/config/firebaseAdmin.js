import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const requiredEnv = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];

function getMissingFirebaseEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

function getServiceAccount() {
  const missing = getMissingFirebaseEnv();

  if (missing.length > 0) {
    throw new Error(`Missing Firebase Admin environment variables: ${missing.join(", ")}`);
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY.trim()
    .replace(/,$/, "")
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  };
}

export function getFirebaseAdminApp() {
  const existingApp = getApps()[0];

  if (existingApp) {
    return existingApp;
  }

  return initializeApp({
    credential: cert(getServiceAccount()),
  });
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function getFirebaseDb() {
  return getFirestore(getFirebaseAdminApp());
}
