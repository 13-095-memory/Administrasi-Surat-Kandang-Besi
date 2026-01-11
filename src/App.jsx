import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BuatSurat from "./pages/BuatSurat";
import Profil from "./pages/Profil"; // Ini akan memanggil file Profil.jsx di folder pages
import FormulirSurat from "./pages/FormulirSurat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect otomatis ke login saat buka web */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda" element={<Dashboard />} />
        <Route path="/buat-surat" element={<BuatSurat />} />
        <Route path="/formulir-surat" element={<FormulirSurat />} />
        
        {/* Halaman Profil */}
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;