import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnaSayfa from "./pages/Anasayfa";
import KullaniciPanel from "./pages/KullaniciPanel";
import YetkiliPanel from "./pages/YetkiliPanel";
import TamamlananYetkili from "./pages/TamamlananYetkili";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/kullanici" element={<KullaniciPanel />} />
        <Route path="/yetkili" element={<YetkiliPanel />} />
        <Route path="/tamamlanan-yetkili" element={<TamamlananYetkili />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
