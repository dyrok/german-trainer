// Firebase: anonymous-auth + Firestore for the cross-device sync, leaderboard, and
// admin panel. Everything here fails soft so the app stays fully usable offline.
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6f2fSJU3wl2bt60xAGmS2yXJp_T92yR8",
  authDomain: "exampreper-9a7fe.firebaseapp.com",
  projectId: "exampreper-9a7fe",
  storageBucket: "exampreper-9a7fe.firebasestorage.app",
  messagingSenderId: "462432416082",
  appId: "1:462432416082:web:6120e4af7400ab91048a8b",
};

export const ADMIN_EMAIL = "dyrokg@gmail.com";

let db = null, authReady = null;
export function initFirebase() {
  if (db) return;
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    authReady = signInAnonymously(getAuth(app)).catch(() => {});
  } catch { db = null; }
}

// Firestore doc id from an email (lowercased; '/' is the only forbidden char in ids).
export function emailKey(email) { return String(email || "").trim().toLowerCase().replace(/\//g, "_"); }

export async function cloudSave(key, payload) {
  if (!db || !key) return false;
  try { await authReady; await setDoc(doc(db, "players", key), payload, { merge: true }); return true; }
  catch { return false; }
}
export async function cloudLoad(key) {
  if (!db || !key) return null;
  try { await authReady; const s = await getDoc(doc(db, "players", key)); return s.exists() ? s.data() : null; }
  catch { return null; }
}
export async function cloudLeaderboard(n = 100) {
  if (!db) return [];
  try { await authReady; const snap = await getDocs(query(collection(db, "players"), orderBy("xp", "desc"), limit(n)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })); }
  catch { return []; }
}
export async function cloudAllPlayers() {
  if (!db) return [];
  try { await authReady; const snap = await getDocs(collection(db, "players"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })); }
  catch { return []; }
}
