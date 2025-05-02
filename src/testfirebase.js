import React from "react";
import { database } from "./firebaseConfig";
import { ref, set } from "firebase/database";

const TestFirebase = () => {
    const veriGonder = () => {
        set(ref(database, "test_verisi/"), {
            mesaj: "Firebase bağlantısı başarılı!",
            zaman: new Date().toISOString(),
        })
            .then(() => alert(" Veri başarıyla Firebase'e yazıldı!"))
            .catch((error) => alert(" Hata oluştu: " + error.message));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Firebase Bağlantı Testi</h2>
            <button onClick={veriGonder} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Firebase'e Test Verisi Gönder
            </button>
        </div>
    );
};

export default TestFirebase;
