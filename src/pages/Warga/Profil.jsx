import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Di sini pakai ../ karena masuk folder pages

export default function Profil() {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("userProfile")) || {
    nama: "Budi Santoso ",
    nik: "3201234567890123",
    pekerjaan: "Wiraswasta",
    email: "budi.santoso@email.com",
    telp: "0812-3456-7890",
    alamat: "Jl. Melati No. 12, RT 03/RW 07, Desa Sukamaju",
    tglLahir: "15 Januari 1990"
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col items-center pt-10 pb-6 text-center">
            <div className="w-24 h-24 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
               <img src={`https://ui-avatars.com/api/?name=${profile.nama}&background=random`} alt="Avatar" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{profile.nama}</h2>
            <p className="text-xs text-slate-400 font-mono mt-1">NIK: {profile.nik}</p>
            <div className="mt-4 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-bold border border-green-100">
              ● Akun Terverifikasi
            </div>
          </div>

          <div className="px-8 pb-6">
            <InfoRow label="Pekerjaan" value={profile.pekerjaan} icon="💼" />
            <InfoRow label="Email" value={profile.email} icon="✉️" />
            <InfoRow label="No. Telepon" value={profile.telp} icon="📞" />
            <InfoRow label="Alamat" value={profile.alamat} icon="📍" />
            <InfoRow label="Tanggal Lahir" value={profile.tglLahir} icon="📅" />
          </div>

          <div className="px-8 pb-10 flex justify-center">
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-8 py-3 rounded-2xl font-bold hover:bg-red-100 border border-red-100 transition-all">
              🚪 Keluar dari Sistem
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}