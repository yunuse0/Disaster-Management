import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCwW68OHUdaLEo1arFFa7FXn7FvpM-mhu4",
    authDomain: "afet-yonetimi-342f4.firebaseapp.com",
    databaseURL: "https://afet-yonetimi-342f4-default-rtdb.firebaseio.com",
    projectId: "afet-yonetimi-342f4",
    storageBucket: "afet-yonetimi-342f4.firebasestorage.app",
    messagingSenderId: "949953186536",
    appId: "1:949953186536:web:62eda97e5ef90c952d975d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { auth, database, ref, onValue, update, push, set, getToken, onMessage, messaging };