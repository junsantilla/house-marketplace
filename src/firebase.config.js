import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBsdLKA8B6czkDMdrIreJBf26wkGt9Hvdw",
	authDomain: "home-marketplace-6bf8e.firebaseapp.com",
	projectId: "home-marketplace-6bf8e",
	storageBucket: "home-marketplace-6bf8e.appspot.com",
	messagingSenderId: "383302566714",
	appId: "1:383302566714:web:ecb4793d2b4d2650a58603",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
