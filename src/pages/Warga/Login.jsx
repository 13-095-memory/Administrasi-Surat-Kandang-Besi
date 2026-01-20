import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validasi sederhana NIK 16 digit
    if (nik.length !== 16) {
      alert("NIK harus 16 digit!");
      return;
    }

    // Simpan status & Nama untuk Navbar
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("namaUser", "Budi Santoso"); // Simulasi nama yang muncul di Navbar
    
    navigate("/beranda"); // Pindah ke beranda setelah login
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans text-[#1E293B]">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-md w-full border border-slate-100 flex flex-col items-center">
        <div className="bg-[#1E293B] p-5 rounded-[24px] mb-5 shadow-lg shadow-slate-300 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-[32px] font-bold mb-1">SuratDesa</h1>
        <p className="text-slate-500 mb-8 text-center text-sm">Masuk menggunakan NIK terdaftar</p>

        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div>
            <label className="block text-slate-700 font-bold mb-2 ml-1 text-sm">NIK Penduduk</label>
            <input 
              type="text" 
              required
              placeholder="Masukkan 16 digit NIK" 
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-slate-400" 
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2 ml-1 text-sm">Kata Sandi</label>
            <input 
              type="password" 
              required
              placeholder="Masukkan kata sandi" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-slate-400" 
            />
          </div>
          <button type="submit" className="w-full bg-[#1E293B] text-white font-bold py-4 rounded-[18px] hover:bg-black transition-all shadow-lg text-lg">
            Masuk ke Sistem
          </button>
        </form>
        <p className="mt-8 text-sm text-slate-500">
          Belum punya akun? <Link to="/register" className="text-slate-800 font-bold hover:underline">Daftar disini</Link>
        </p>
      </div>
    </div>
  );
}