// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtiE2RPEoudMdgh46q-YrP5eH81-cFAXs",
  authDomain: "energon-platform.firebaseapp.com",
  projectId: "energon-platform",
  storageBucket: "energon-platform.appspot.com",
  messagingSenderId: "849036393762",
  appId: "1:849036393762:web:85f5d67716e65a9313f97b",
  measurementId: "G-5YB8X5X998"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Export Services for use in App.jsx
export const db = getFirestore(app);
export const auth = getAuth(app);

// 4. Helper Function: Fetch Products from Firestore
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    // Convert DB snapshot to the format our App uses
    const productList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productList;
  } catch (error) {
    console.error("Error connecting to DB: ", error);
    return []; // Return empty array on error
  }
};