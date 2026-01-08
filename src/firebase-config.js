import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- PASTE YOUR REAL KEYS FROM FIREBASE CONSOLE HERE ---
const firebaseConfig = {
  apiKey: "AIzaSyCtiE2RPEoudMdgh46q-YrP5eH81-cFAXs",
  authDomain: "energon-platform.firebaseapp.com",
  projectId: "energon-platform",
  storageBucket: "energon-platform.appspot.com",
  messagingSenderId: "849036393762",
  appId: "1:849036393762:web:85f5d67716e65a9313f97b",
  measurementId: "G-5YB8X5X998"
};

// 1. Initialize Firebase (This line must exist!)
const app = initializeApp(firebaseConfig);

// 2. Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// 3. Helper to fetch data
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("🔥 Firebase Data Loaded:", list);
    return list;
  } catch (error) {
    console.error("❌ Firebase Connection Error:", error);
    return [];
  }
};