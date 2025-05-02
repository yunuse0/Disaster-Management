importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCwW68OHUdaLEo1arFFa7FXn7FvpM-mhu4",
    authDomain: "afet-yonetimi-342f4.firebaseapp.com",
    projectId: "afet-yonetimi-342f4",
    messagingSenderId: "949953186536",
    appId: "1:949953186536:web:62eda97e5ef90c952d975d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background mesajı alındı:", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo192.png",
    });
});
