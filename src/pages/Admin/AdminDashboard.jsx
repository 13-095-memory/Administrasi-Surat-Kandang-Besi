import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle, Users, ChevronDown } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [statusSurat, setStatusSurat] = useState("menunggu");

  // Data Statistik tetap ditampilkan di atas
  const stats = [
    { label: "Total Pengajuan", count: "124", icon: <FileText size={20} />, color: "text-blue-800", bg: "bg-blue-50" },
    { label: "Perlu Diproses", count: "12", icon: <Clock size={20} />, color: "text-amber-800", bg: "bg-amber-50" },
    { label: "Selesai Hari Ini", count: "45", icon: <CheckCircle size={20} />, color: "text-emerald-800", bg: "bg-emerald-50" },
  ];

  const handleStatusChange = (e, wargaData) => {
    const newStatus = e.target.value;
    setStatusSurat(newStatus);
  };

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen text-left">
      {/* 1. BAGIAN STATISTIK (DIPERTAHANKAN DI ATAS) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[25px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <h3 className="text-[#1E3A8A] text-2xl font-black">{s.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. TABEL ANTRIAN DENGAN DROPDOWN AKSI */}
      <div className="bg-white rounded-[35px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-[#1E3A8A] font-black uppercase text-xs tracking-widest">Antrian Pengajuan Terbaru</h3>
        </div>
        
        <div className="p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Nama Warga</th>
                <th className="py-4">Jenis Surat</th>
                <th className="py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-slate-600">
              <tr className="border-t border-slate-50">
                <td className="px-6 py-6">
                  <span className="text-[#1E3A8A]">Rusdi</span>
                  <p className="text-[10px] text-slate-400 font-medium">NIK: 1806251010820003</p>
                </td>
                <td><span className="bg-slate-100 px-3 py-1 rounded-lg text-[9px] uppercase">Domisili</span></td>
                <td className="text-slate-400">20 Jan 2026</td>
                <td className="px-6 py-6 text-right">
                  {/* DROPDOWN STATUS DI BAGIAN AKSI */}
                  <div className="relative inline-block text-left">
                    <select 
                      onChange={(e) => handleStatusChange(e, { nama: "Rusdi", nik: "1806251010820003" })}
                      className={`
                        appearance-none pl-4 pr-10 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer outline-none
                        ${statusSurat === "menunggu" ? "bg-slate-50 border-slate-200 text-slate-500" : ""}
                        ${statusSurat === "proses" ? "bg-amber-50 border-amber-200 text-amber-600" : ""}
                        ${statusSurat === "selesai" ? "bg-emerald-50 border-emerald-200 text-emerald-600" : ""}
                        ${statusSurat === "ditolak" ? "bg-rose-50 border-rose-200 text-rose-600" : ""}
                      `}
                    >
                      <option value="menunggu">Menunggu</option>
                      <option value="proses">Proses</option>
                      <option value="selesai">Selesai</option>
                      <option value="ditolak">Tolak</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}