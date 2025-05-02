import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import "../App.css";

const Register = () => {
    const [ad, setAd] = useState("");
    const [soyad, setSoyad] = useState("");
    const [mail, setMail] = useState("");
    const [sifre, setSifre] = useState("");
    const [yetkiliMi, setYetkiliMi] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleKayit = async () => {
        try {
            // Firebase Authentication ile kayıt olma
            const userCredential = await createUserWithEmailAndPassword(auth, mail, sifre);
            const user = userCredential.user;

            // Kullanıcı bilgilerini Firebase Realtime Database'e kaydetme
            set(ref(database, "kullanıcılar/" + user.uid), {
                ad,
                soyad,
                mail,
                yetkiliMi,
            });

            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-page">
            <header className="anasayfa-header">
                <h1>Afet Yardım Uygulaması</h1>
            </header>
            <br></br><br></br><br></br><br></br>
            <div className="register-container">
                <h1 className="register-title">Kayıt Ol</h1>
                <div className="register-form">
                    <label>Ad</label>
                    <input
                        type="text"
                        value={ad}
                        onChange={(e) => setAd(e.target.value)}
                    />

                    <label>Soyad</label>
                    <input
                        type="text"
                        value={soyad}
                        onChange={(e) => setSoyad(e.target.value)}
                    />

                    <label>E-mail</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />

                    <label>Şifre</label>
                    <input
                        type="password"
                        value={sifre}
                        onChange={(e) => setSifre(e.target.value)}
                    />

                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={yetkiliMi}
                            onChange={(e) => setYetkiliMi(e.target.checked)}
                        />
                        <span>Yetkili olarak kaydol</span>
                    </div>

                    <button id="register" onClick={handleKayit}>Kayıt Ol</button>

                    {error && <p className="error-message">{error}</p>}

                </div>

            </div>
            <div className="footer">
                <p className="footer-text">© 2024 Afet Yardım Uygulaması | Tüm hakları saklıdır.</p>
                <div className="footer-links">
                    <a href="https://www.afad.gov.tr/" target="_blank" rel="noopener noreferrer">AFAD</a> |
                    <a href="https://www.kizilay.org.tr/" target="_blank" rel="noopener noreferrer">Kızılay</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
