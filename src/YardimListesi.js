import React, { useEffect, useState } from "react";
import { database } from "./firebaseConfig";
import { ref, onValue, update } from "firebase/database";

const YardimListesi = () => {
    const [yardimlar, setYardimlar] = useState([]);

    useEffect(() => {
        const yardimRef = ref(database, "yardim_cagrilari/");
        onValue(yardimRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const yardimListesi = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setYardimlar(yardimListesi);
            }
        });
    }, []);

    const durumuGuncelle = (id, yeniDurum) => {
        update(ref(database, `yardim_cagrilari/${id}`), { durum_kodu: yeniDurum })
            .then(() => alert("✅ Durum güncellendi!"))
            .catch((error) => alert("❌ Hata: " + error.message));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>📋 Yardım Çağrıları</h2>
            {yardimlar.length === 0 ? <p>Şu anda bekleyen çağrı yok.</p> : null}
            {yardimlar.map((yardim) => (
                <div
                    key={yardim.id}
                    style={{
                        border: "1px solid black",
                        margin: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#f8f8f8",
                    }}
                >
                    <p><strong>📌 Kullanıcı:</strong> {yardim.kullanici_adi}</p>
                    <p><strong>📍 Konum:</strong> {yardim.konum}</p>
                    <p><strong>🚨 Durum:</strong> {yardim.durum}</p>
                    <p><strong>⏳ Mevcut Durum:</strong> {yardim.durum_kodu}</p>
                    <button
                        onClick={() => durumuGuncelle(yardim.id, "Yetkililer Yolda")}
                        style={{
                            padding: "5px 10px",
                            margin: "5px",
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        🚑 Yetkililer Yolda
                    </button>
                    <button
                        onClick={() => durumuGuncelle(yardim.id, "Tamamlandı")}
                        style={{
                            padding: "5px 10px",
                            margin: "5px",
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        ✅ Tamamlandı
                    </button>
                </div>
            ))}
        </div>
    );
};

export default YardimListesi;
