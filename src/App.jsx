import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Halaman Warga
import Login from "./pages/Warga/Login";
import Register from "./pages/Warga/Register";
import Dashboard from "./pages/Warga/Dashboard";
import BuatSurat from "./pages/Warga/BuatSurat";
import Profil from "./pages/Warga/Profil"; 
import FormulirSurat from "./pages/Warga/FormulirSurat";

// Import Halaman Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AdminTemplate from "./pages/Admin/AdminTemplate"; // <--- Pastikan file ini ada jika ingin di-import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* --- AREA WARGA --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda" element={<Dashboard />} />
        <Route path="/buat-surat" element={<BuatSurat />} />
        <Route path="/formulir-surat" element={<FormulirSurat />} />
        <Route path="/profil" element={<Profil />} />

        {/* --- AREA ADMIN --- */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* Sementara di-comment jika file belum dibuat agar tidak putih/blank */}
        {/* <Route path="/admin-templates" element={<AdminTemplate />} /> */}

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;