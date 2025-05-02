import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

//  Aktif yardımlar için işaretçi
const activeMarkerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
    iconSize: [30, 40],
});

const YetkiliPanel = () => {
    const [yardimlar, setYardimlar] = useState([]);

    useEffect(() => {
        const yardimRef = ref(database, "yardim_cagrilari");
        onValue(yardimRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setYardimlar(Object.entries(data).map(([id, value]) => ({ id, ...value })));
            }
        });
    }, []);

    //  Yardım çağrısının durumunu güncelleme fonksiyonu
    const handleDurumGuncelle = (id, yeniDurum) => {
        update(ref(database, `yardim_cagrilari/${id}`), { durum: yeniDurum });
    };

    return (
        <div className="kullanici-paneli">
            {/* Kullanıcı Paneli Başlık */}
            <h2>Yetkili Paneli</h2>



            {/* Yardım çağrılarını haritada göster */}
            <MapContainer center={[39.92, 32.85]} zoom={6} style={{ height: "500px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Sadece tamamlanmayanları gösteriyoruz */}
                {yardimlar
                    .filter((yardim) => yardim.durum !== "Tamamlandı") // Tamamlananları gizle
                    .map((yardim) => {
                        if (yardim.konum) {
                            const [lat, lng] = yardim.konum.split(",").map(Number);

                            return (
                                <Marker key={yardim.id} position={[lat, lng]} icon={activeMarkerIcon}>
                                    <Popup>
                                        <strong>{yardim.isim}</strong> <br />
                                        Yardım Türü: {yardim.yardimTuru} <br />
                                        Durum: {yardim.durum}
                                        <br />
                                        {/* Yardım durumu değiştirme butonları */}
                                        <div>
                                            <button onClick={() => handleDurumGuncelle(yardim.id, "Beklemede")}>
                                                Beklemede
                                            </button>
                                            <button onClick={() => handleDurumGuncelle(yardim.id, "İşlemde")}>
                                                İşlemde
                                            </button>
                                            <button onClick={() => handleDurumGuncelle(yardim.id, "Tamamlandı")}>
                                                Tamamlandı
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        }
                        return null;
                    })}
            </MapContainer>

            {/* Tamamlanmayan yardımları liste olarak göster */}
            <h3>Mevcut Yardım Çağrıları</h3>
            <ul>
                {yardimlar
                    .filter((yardim) => yardim.durum !== "Tamamlandı")
                    .map((yardim) => (
                        <li key={yardim.id}>
                            {yardim.isim} - {yardim.konum} - {yardim.yardimTuru} - <strong>{yardim.durum}</strong>
                            <br />
                            <button onClick={() => handleDurumGuncelle(yardim.id, "Beklemede")}>
                                Beklemede
                            </button>
                            <button onClick={() => handleDurumGuncelle(yardim.id, "İşlemde")}>
                                İşlemde
                            </button>
                            <button onClick={() => handleDurumGuncelle(yardim.id, "Tamamlandı")}>
                                Tamamlandı
                            </button>
                        </li>
                    ))}
            </ul>
            <Link to="/tamamlanan-yetkili">
                <button>Tamamlanan Yardımları Gör</button>
            </Link>
            <br /><br /><br /><br /><br />
        </div>
    );
};

export default YetkiliPanel;
