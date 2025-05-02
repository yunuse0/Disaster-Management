import React, { useState } from "react";
import { database } from "./firebaseConfig";
import { ref, push } from "firebase/database";

const YardimCagrisi = () => {
    const [kullaniciAdi, setKullaniciAdi] = useState("");
    const [yardimTuru, setYardimTuru] = useState("");
    const [konum, setKonum] = useState("");

    const yardimGonder = () => {
        if (!kullaniciAdi || !yardimTuru || !konum) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        push(ref(database, "yardim_cagrilari/"), {
            kullanici_adi: kullaniciAdi,
            konum: konum,
            durum: yardimTuru,
            zaman: new Date().toISOString(),
            durum_kodu: "Beklemede",
        })
            .then(() => alert("✅ Yardım çağrısı gönderildi!"))
            .catch((error) => alert("❌ Hata oluştu: " + error.message));
    };


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>📢 Yardım Çağrısı Yap</h2>
            <input
                type="text"
                placeholder="Adınız"
                value={kullaniciAdi}
                onChange={(e) => setKullaniciAdi(e.target.value)}
                style={{ margin: "5px", padding: "8px", width: "200px" }}
            />
            <br />
            <input
                type="text"
                placeholder="Konum (Enlem, Boylam)"
                value={konum}
                onChange={(e) => setKonum(e.target.value)}
                style={{ margin: "5px", padding: "8px", width: "200px" }}
            />
            <br />
            <select
                value={yardimTuru}
                onChange={(e) => setYardimTuru(e.target.value)}
                style={{ margin: "5px", padding: "8px", width: "220px" }}
            >
                <option value="">Yardım Türü Seç</option>
                <option value="Sağlık Yardımı">🚑 Sağlık Yardımı</option>
                <option value="Göçük Altında">🏚️ Göçük Altında</option>
                <option value="Gıda ve Su İhtiyacı">🥖 Gıda ve Su İhtiyacı</option>
            </select>
            <br />
            <button
                onClick={yardimGonder}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "10px",
                }}
            >
                📩 Yardım Çağrısı Gönder
            </button>
        </div>
    );
};

export default YardimCagrisi;
