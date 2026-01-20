import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Ambil status login dan nama dari localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const namaUser = localStorage.getItem("namaUser") || "Penduduk";

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    navigate("/login");
  };

  // Style untuk menu aktif (warna oranye) dan idle (putih)
  const activeStyle = "text-orange-500 font-bold border-b-2 border-orange-500 pb-1 transition-all";
  const idleStyle = "text-white hover:text-orange-400 transition-all";

  return (
    <nav className="flex justify-between items-center p-6 bg-[#0F172A] text-white sticky top-0 z-[100] shadow-md">
      {/* Sisi Kiri: Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/beranda")}>
        <div className="bg-white text-[#0F172A] px-2 py-1 rounded font-bold text-sm">SD</div>
        <span className="font-bold uppercase tracking-widest text-sm">SuratDesa</span>
      </div>
      
      {/* Sisi Kanan: Menu Navigasi */}
      <div className="flex gap-8 items-center font-medium">
        <NavLink to="/beranda" className={({ isActive }) => (isActive ? activeStyle : idleStyle)}>
          Beranda
        </NavLink>
        
        <NavLink to="/buat-surat" className={({ isActive }) => (isActive ? activeStyle : idleStyle)}>
          Layanan
        </NavLink>

        {/* Tombol Profil/Login */}
        {isLoggedIn ? (
          <div className="relative ml-4">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-slate-800/50 py-1.5 px-4 rounded-full border border-slate-700 hover:bg-slate-700 transition-all shadow-sm"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white shadow-md">
                {namaUser.charAt(0)}
              </div>
              <span className="text-sm font-bold hidden md:block">{namaUser}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu - Ditempatkan di luar button profil */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 overflow-hidden z-[110] animate-in fade-in slide-in-from-top-2">
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/profil");
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center gap-3 border-b border-slate-50"
                >
                  <span className="text-base">👤</span>
                  Profil Saya
                </button>

                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center gap-3"
                >
                  <span className="text-base">🚪</span>
                  Keluar Sistem
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            className="bg-[#F97316] px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}