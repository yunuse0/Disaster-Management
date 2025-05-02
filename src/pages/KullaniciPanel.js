import React, { useState, useEffect } from "react";
import { auth, database, messaging, getToken, onMessage } from "../firebaseConfig";
import { ref, push, onValue, set } from "firebase/database";

const KullaniciPanel = () => {
    const [yardimlar, setYardimlar] = useState([]);
    const [kullaniciBilgi, setKullaniciBilgi] = useState(null);
    const [konum, setKonum] = useState("");
    const [yardimTuru, setYardimTuru] = useState("Gıda Yardımı");
    const [fcmToken, setFcmToken] = useState("");

    const yardimTurleri = [
        "Gıda Yardımı",
        "Tıbbi Destek",
        "Barınma Yardımı",
        "Arama Kurtarma",
        "Psikolojik Destek",
    ];

    useEffect(() => {
        const yardimRef = ref(database, "yardim_cagrilari");
        onValue(yardimRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setYardimlar(Object.entries(data).map(([id, value]) => ({ id, ...value })));
            }
        });

        onMessage(messaging, (payload) => {
            alert(` Bildirim: ${payload.notification.title} - ${payload.notification.body}`);
        });
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(database, "kullanıcılar/" + user.uid);
            onValue(userRef, (snapshot) => {
                setKullaniciBilgi(snapshot.val());
            });

            getToken(messaging, {
                vapidKey: "BAS-PUBLIC-KEY"
            })
                .then((token) => {
                    if (token) {
                        setFcmToken(token);
                        set(ref(database, `users/${user.uid}/fcmToken`), token);
                    }
                })
                .catch((err) => console.log("FCM Token alınırken hata:", err));
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setKonum(`${position.coords.latitude},${position.coords.longitude}`);
            });
        }
    }, []);

    const handleYardimEkle = () => {
        if (!kullaniciBilgi) {
            alert("Kullanıcı bilgileri alınamadı!");
            return;
        }

        if (!konum || !yardimTuru) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        const yeniYardim = {
            isim: `${kullaniciBilgi.ad} ${kullaniciBilgi.soyad}`,
            mail: kullaniciBilgi.mail,
            konum,
            yardimTuru,
            durum: "Beklemede",
        };

        push(ref(database, "yardim_cagrilari"), yeniYardim)
            .then(() => {
                alert(" Yardım çağrınız başarıyla gönderildi!");
            })
            .catch((error) => {
                alert("Yardım çağrısı oluşturulurken hata oluştu!");
                console.error(error);
            });
    };

    return (
        <div className="kullanici-paneli">
            <h2>Kullanıcı Paneli</h2>



            <div className="main-content">
                <h3>Yardım Çağrısı Oluştur</h3>



                {kullaniciBilgi ? (
                    <p>
                        Yardım talebi, <strong>{kullaniciBilgi.ad} {kullaniciBilgi.soyad}</strong> adına oluşturulacak.
                    </p>
                ) : (
                    <p>Kullanıcı bilgileri yükleniyor...</p>
                )}

                <p>{konum ? `Konumunuz: ${konum}` : "Konum alınıyor..."}</p>

                <label>
                    Yardım Türü:
                    <select value={yardimTuru} onChange={(e) => setYardimTuru(e.target.value)}>
                        {yardimTurleri.map((tur, index) => (
                            <option key={index} value={tur}>
                                {tur}
                            </option>
                        ))}
                    </select>
                </label>

                <button onClick={handleYardimEkle}>Gönder</button>
                <div className="sidebar-container">
                    {/* Sol Bilgilendirme Kısmı */}
                    <div className="sidebar">
                        <h3>Yardım Çağrısı Nedir?</h3>
                        <p>
                            Yardım çağrısı, acil durumlarda ihtiyaç duyulan yardım türüne göre
                            yardım taleplerinin iletilmesidir. Bu çağrılar, ilgili yetkililere bildirilir ve hızla çözülmesi sağlanır.
                        </p>
                    </div>

                    {/* Sağ Bilgilendirme Kısmı */}
                    <div className="sidebar">
                        <h3>Yardım Türleri</h3>
                        <p>
                            1. **Gıda Yardımı**: Yiyecek temini için yapılan talepler.<br />
                            2. **Tıbbi Destek**: Acil tıbbi yardım ve tedavi talepleri.<br />
                            3. **Barınma Yardımı**: Barınma gereksinimi olan kişilere yardım.<br />
                            4. **Arama Kurtarma**: Kaybolan veya zor durumda olan kişilerin aranması.<br />
                            5. **Psikolojik Destek**: Psikolojik yardım ve destek talepleri.
                        </p>
                    </div>
                </div>

                <h3>Mevcut Yardım Çağrıları</h3>
                <ul>
                    {yardimlar.map((yardim) => (
                        <li key={yardim.id}>
                            {yardim.isim} - {yardim.konum} - {yardim.yardimTuru} - <strong>{yardim.durum}</strong>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="footer">
                <p className="footer-text-kp">© 2024 Afet Yardım Uygulaması | Tüm hakları saklıdır.</p>
                <div className="footer-links">
                    <a href="https://www.afad.gov.tr/" target="_blank" rel="noopener noreferrer">AFAD</a> |
                    <a href="https://www.kizilay.org.tr/" target="_blank" rel="noopener noreferrer">Kızılay</a>
                </div>
            </div>
        </div>
    );
};

export default KullaniciPanel;
