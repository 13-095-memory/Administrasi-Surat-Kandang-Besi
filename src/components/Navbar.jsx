import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoSilades from "../assets/123.png";

export default function Navbar() {
  const [userName, setUserName] = useState("Tamu");

  // Fungsi untuk mengambil data terbaru dari localStorage
  const loadUser = () => {
    // Kita standarkan kuncinya adalah 'profil'
    const saved = localStorage.getItem("profil"); 
    if (saved) {
      try {
        const userData = JSON.parse(saved);
        // Pastikan mengambil properti yang benar dari objek
        setUserName(userData.nama_lengkap || "User");
      } catch (error) {
        setUserName("Tamu");
      }
    } else {
      setUserName("Tamu");
    }
  };

  useEffect(() => {
    loadUser();

    // Listener supaya Navbar update otomatis jika ada perubahan di tab lain
    window.addEventListener("storage", loadUser);
    
    // Listener custom supaya Navbar update saat kita panggil dari Profil.jsx
    window.addEventListener("profileUpdate", loadUser);
    
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("profileUpdate", loadUser);
    };
  }, []);

  return (
    <nav className="bg-[#1E3A8A] px-10 py-4 flex justify-between items-center shadow-lg sticky top-0 z-[9999]">
      <div className="flex items-center gap-3">
        <img src={LogoSilades} alt="Logo" className="h-10 w-auto rounded-lg bg-white p-1" />
        <div>
          <span className="text-white font-black block leading-none uppercase text-sm">SILADES</span>
          <span className="text-white/70 text-[8px] uppercase tracking-widest font-bold">Pekon Kandang Besi</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Link to="/beranda" className="text-white/80 hover:text-white text-[10px] font-bold uppercase tracking-widest">Beranda</Link>
        <Link to="/layanan" className="text-white/80 hover:text-white text-[10px] font-bold uppercase tracking-widest">Layanan Surat</Link>
        <Link to="/status" className="text-white/80 hover:text-white text-[10px] font-bold uppercase tracking-widest">Status Surat</Link>

        <Link to="/profil" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 transition-all">
          <div className="w-7 h-7 bg-white text-[#1E3A8A] rounded-full flex items-center justify-center font-black text-xs uppercase">
            {userName.charAt(0)}
          </div>
          <span className="text-white text-[10px] font-black uppercase tracking-widest">
            {userName}
          </span>
        </Link>
      </div>
    </nav>
  );
}