import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, onValue } from "firebase/database";

const Login = () => {
    const [mail, setMail] = useState("");
    const [sifre, setSifre] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!mail || !sifre) {
            setError("Lütfen tüm alanları doldurun!");
            return;
        }

        signInWithEmailAndPassword(auth, mail, sifre)
            .then((userCredential) => {
                const user = userCredential.user;
                const userRef = ref(database, "kullanıcılar/" + user.uid);
                onValue(
                    userRef,
                    (snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            if (data.yetkiliMi) {
                                navigate("/yetkili");
                            } else {
                                navigate("/kullanici");
                            }
                        } else {
                            setError("Kullanıcı verileri bulunamadı!");
                        }
                    },
                    { onlyOnce: true }
                );
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="Login-page">

            <div className="login-container">
                <header className="anasayfa-header">
                    <h1>Afet Yardım Uygulaması</h1>
                </header>
                <div className="center-section1">
                    <h2>Giriş Yap</h2>
                    <br></br><br></br>
                    <div>
                        <label className="login-label">
                            <strong>E-mail: </strong> &nbsp;
                            <input className="login-input"
                                type="email"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                            <br></br><br></br>
                        </label>
                    </div>
                    <div>
                        <label className="login-label">
                            <strong>Şifre: </strong> &nbsp;&nbsp;&nbsp;
                            <input className="login-input"
                                type="password"
                                value={sifre}
                                onChange={(e) => setSifre(e.target.value)}
                            />
                        </label>
                    </div>
                    <br></br>
                    <button id="login1" onClick={handleLogin}>
                        Giriş Yap
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <br></br>
                    <p className="login-footer-text">Afet Yardım Uygulaması, afet durumlarında yardım talep etmek ve yardım sağlamak için tasarlanmış bir platformdur.</p>
                </div>
                <br></br>

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

export default Login;