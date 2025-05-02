import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Anasayfa = () => {
    return (
        <div className="anasayfa-wrapper">

            <header className="anasayfa-header">
                <h1>Afet Yardım Uygulaması</h1>
            </header>
            <div className="anasayfa-container">
                <br></br><br></br><br></br>


                {/* Sol Kısım */}
                <div className="left-section">
                    <h2>Afet Yardım Hakkında</h2>
                    <p>Afet durumlarında hızlı ve etkili yardım sağlamak, insanların hayatını kurtarmak için çok önemlidir. Bu uygulama, afet yardımlarının hızlıca organize edilmesine olanak tanır.</p>
                    <img src="/resimler/afet.jpg" alt="Afet Yardım" />
                </div>

                {/* Ortadaki Giriş Bölümü */}
                <div className="center-section">

                    <h2>Hoş Geldiniz</h2>
                    <p>Devam etmek için giriş yapın veya kayıt olun</p>
                    <Link to="/login">
                        <button id="login">Giriş Yap</button>
                    </Link>
                    <Link to="/register">
                        <button id="register">Kayıt Ol</button>
                    </Link>
                </div>

                {/* Sağ Kısım */}
                <div className="right-section">
                    <h2>Uygulama Özellikleri</h2>
                    <p>Bu uygulama, afet ve acil durumlar sırasında yardım taleplerini hızlı bir şekilde göndermenizi sağlar. Ayrıca, yetkililer yardım taleplerine anında müdahale edebilir.</p>
                    <img src="/resimler/telefon.jpg" alt="Uygulama Özellikleri" />
                </div>
            </div>

            <div className="bilgilendirme-section">
                <h2>📢 - Afet Sırasında Unutmayın !</h2>
                <hr></hr> <br></br><br></br>
                <div className="bilgilendirme-box">
                    <h3>🌍 Deprem Anında Ne Yapmalı?</h3>
                    <ul>
                        <li>- Sabitlenmemiş dolaplardan, raflardan ve camlardan uzak durun.</li>
                        <li>- Varsa sağlam sandalyelerle desteklenmiş masa altına veya dolgun ve hacimli koltuk, kanepe, içi dolu sandık gibi koruma sağlayabilecek eşya yanına çömelerek veya uzanarak kendinize hayat üçgeni oluşturun.</li>
                        <li>- Başınızı iki elinizin arasına alarak veya bir koruyucu (yastık, kitap vb) malzeme ile koruyun.</li>
                        <li>- ÇÖK, KAPAN, TUTUN hareketini yaparak sarsıntının geçmesini bekleyin.</li>
                        <li>- Asansörleri kullanmayın.</li>
                    </ul>
                </div>
                <div className="bilgilendirme-box">
                    <h3>🔥 Yangın Sırasında Ne Yapmalı?</h3>
                    <ul>
                        <li>- Derhal yangın çıkışlarına yönelin, panik yapmadan hareket edin.</li>
                        <li>- Yangın söndürücülerini kullanmayı öğrenin ve gerektiğinde kullanın.</li>
                        <li>- Yangın alarmı çaldığında hemen binayı terk edin.</li>
                        <li>- Asansörleri kullanmayın, merdivenleri tercih edin.</li>
                        <li>- Yangın sırasında kapıları açmadan önce kapı kollarını kontrol edin; sıcaksa açmayın.</li>
                        <li>- Yoğun duman olan alanlardan uzak durun.</li>
                        <li>- Kapı kollarını kontrol edin; sıcaksa açmayın.</li>
                    </ul>
                </div>
                <br></br><br></br>
                <div className="bilgilendirme-box">
                    <h3>🌊 Sel Felaketinde Ne Yapmalı?</h3>
                    <ul>
                        <li>- Yüksek yerlere çıkın ve güvenli bölgede kalmaya çalışın.</li>
                        <li>- Sel sularının yükselmesini bekleyin ve suyun çekilmesini bekleyin.</li>
                        <li>- Sel sularının içinde yürümekten kaçının, akıntıya kapılabilirsiniz.</li>
                        <li>- Elektrik hatlarına dikkat edin, suya temas etmeyin.</li>
                        <li>- Açık alanlarda mümkün olduğunca az zaman geçirin.</li>
                        <li>- Yangın söz konusuysa binayı hemen terk edin.</li>
                    </ul>
                </div>
                <br></br><br></br>
                <a href="https://www.afad.gov.tr/" target="_blank" rel="noopener noreferrer">Daha fazlası için resmi AFAD web sitesini ziyaret edebilirsiniz ! </a>
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

export default Anasayfa;
