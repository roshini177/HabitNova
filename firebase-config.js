// Import Firebase (CDN ESM builds)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCv1N_frlIyz7N-I49vMhbrwcQmk1JdpKo",
    authDomain: "streakflow-e4ca3.firebaseapp.com",
    projectId: "streakflow-e4ca3",
    storageBucket: "streakflow-e4ca3.firebasestorage.app",
    messagingSenderId: "218728579429",
    appId: "1:218728579429:web:6779f0d7d32b054f0e218c",
    measurementId: "G-0GJ1HGT5JX"
};

// Initialize Firebase core + auth used by the app
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup };
