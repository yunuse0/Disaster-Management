import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebaseConfig";
import { Link } from "react-router-dom";

const TamamlananYetkili = () => {
    const [tamamlananlar, setTamamlananlar] = useState([]);

    useEffect(() => {
        const tamamlananRef = ref(database, "yardim_cagrilari");
        onValue(tamamlananRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tamamlananYardimlar = Object.entries(data)
                    .map(([id, value]) => ({ id, ...value }))
                    .filter((yardim) => yardim.durum === "Tamamlandı");
                setTamamlananlar(tamamlananYardimlar);
            } else {
                setTamamlananlar([]);
            }
        });
    }, []);

    return (
        <div>
            <h2> Tamamlanan Yardımlar (Yetkililer)</h2>
            <Link to="/yetkili">
                <button>Geri Dön</button>
            </Link>
            <ul>
                {tamamlananlar.length > 0 ? (
                    tamamlananlar.map((yardim) => (
                        <li key={yardim.id}>
                            <strong>{yardim.isim}</strong> - {yardim.konum} - {yardim.yardimTuru}
                        </li>
                    ))
                ) : (
                    <p>Henüz tamamlanan yardım bulunmamaktadır.</p>
                )}
            </ul>
        </div>
    );
};

export default TamamlananYetkili;
