import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 max-w-lg w-full border border-slate-100 flex flex-col items-center">
        
        <h1 className="text-[32px] font-bold text-[#1E293B] mb-2">Daftar Akun</h1>
        <p className="text-slate-500 text-sm mb-8 text-center font-medium">Sistem Pengajuan Surat Administrasi Desa</p>

        <div className="w-full space-y-4">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5 ml-1 text-sm">Nama Lengkap</label>
            <input type="text" placeholder="Masukkan nama lengkap Anda" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-slate-400" />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5 ml-1 text-sm">NIK (Nomor Induk Kependudukan)</label>
            <input type="text" placeholder="Masukkan NIK Anda" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <p className="text-xs text-slate-400 mt-1 ml-1">NIK harus 16 digit</p>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5 ml-1 text-sm">Kata Sandi</label>
            <input type="password" placeholder="Masukkan kata sandi" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <p className="text-xs text-slate-400 mt-1 ml-1">Minimal 8 karakter, kombinasi huruf dan angka</p>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5 ml-1 text-sm">Konfirmasi Kata Sandi</label>
            <input type="password" placeholder="Masukkan ulang kata sandi" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-slate-400" />
          </div>

          <button className="w-full bg-[#1E293B] text-white font-bold py-4 rounded-[18px] hover:bg-[#0F172A] transition-all mt-4 text-lg shadow-lg">
            Daftar Akun
          </button>

           <p className="text-slate-500 text-sm font-medium">
            Sudah punya akun? <Link to="/login" className="text-slate-800 font-bold hover:underline">Masuk disini</Link>
            </p>
          </div>
        </div>
      </div>
  );
}