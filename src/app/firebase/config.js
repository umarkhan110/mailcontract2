import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_Api_Key,
  authDomain: process.env.NEXT_PUBLIC_Auth_Domain,
  projectId: process.env.NEXT_PUBLIC_Project_Id,
  storageBucket: process.env.NEXT_PUBLIC_Storage_Bucket,
  messagingSenderId: process.env.NEXT_PUBLIC_Messaging_Sender_Id,
  appId: process.env.NEXT_PUBLIC_App_Id
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const db = getFirestore(initializeApp(firebaseConfig));
// // export const storage = getStorage(app); // Initialize Storage using the app instance
// // Initialize Firebase
// const app = !getApps ().length? initializeApp(firebaseConfig) : getApp()
// const auth = getAuth(app)
// export {app, auth}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };