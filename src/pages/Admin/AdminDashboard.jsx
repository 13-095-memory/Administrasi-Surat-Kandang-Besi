import React, { useState, useEffect } from "react";
import AdminTemplate from "./AdminTemplate"; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("BELUM DIKERJAKAN");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [dataPengajuan, setDataPengajuan] = useState([]); 

  // Ambil data dari backend saat halaman dibuka
  useEffect(() => {
    fetch('http://localhost:5000/api/pengajuan')
      .then(res => res.json())
      .then(data => setDataPengajuan(data))
      .catch(err => console.log("Gagal ambil data:", err));
  }, []);

  // Hitung statistik berdasarkan data dari backend
  const stats = {
    diterima: dataPengajuan.length,
    diproses: dataPengajuan.filter(item => item.status === "SEDANG DIPROSES").length,
    selesai: dataPengajuan.filter(item => item.status === "SELESAI").length
  };

  const handleStatusChange = (id, newStatus) => {
  // Update tampilan di layar
  const updatedData = dataPengajuan.map((item) => 
    item.id === id ? { ...item, status: newStatus } : item
  );
  setDataPengajuan(updatedData);

  // SIMPAN KE DATABASE (BACKEND)
  fetch('http://localhost:5000/api/pengajuan/update', {
    method: 'POST', // Kita pakai POST karena mengirim data baru
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, status: newStatus })
  })
  .then(res => res.json())
  .then(data => console.log("Berhasil:", data.message))
  .catch(err => console.error("Error:", err));
};

  const filteredData = dataPengajuan.filter(item => {
    if (activeTab === "BELUM DIKERJAKAN") return item.status === "BELUM DIKERJAKAN";
    if (activeTab === "DIPROSES") return item.status === "SEDANG DIPROSES";
    return item.status === "SELESAI";
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      
      {/* NAVBAR */}
      <header className="bg-[#0f172a] text-white shadow-md sticky top-0 z-50 px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveMenu("Dashboard")}>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-black text-lg">SD</div>
            <span className="font-bold text-lg tracking-tight uppercase">SuratDesa Admin</span>
          </div>
          
          <nav className="flex items-center gap-10">
            <button 
              onClick={() => setActiveMenu("Dashboard")} 
              className={`text-sm font-bold uppercase tracking-widest transition-all pb-2 border-b-2 ${activeMenu === "Dashboard" ? "border-blue-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
            >
              📊 Dashboard
            </button>
            <button 
              onClick={() => setActiveMenu("Template Surat")} 
              className={`text-sm font-bold uppercase tracking-widest transition-all pb-2 border-b-2 ${activeMenu === "Template Surat" ? "border-blue-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
            >
              📄 Template Surat
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white uppercase leading-none">Admin Suryani</p>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-700">AS</div>
          </div>
        </div>
      </header>

      <main className="p-8 md:p-12 max-w-7xl mx-auto animate-in fade-in duration-700">
        
        {activeMenu === "Dashboard" ? (
          <>
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 transition-transform hover:scale-[1.02]">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">📥</div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Data Diterima</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tighter">{stats.diterima}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 transition-transform hover:scale-[1.02]">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">⏳</div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sedang Diproses</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tighter">{stats.diproses}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 transition-transform hover:scale-[1.02]">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">✅</div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Selesai / Ditolak</p>
                  <p className="text-4xl font-black text-slate-800 tracking-tighter">{stats.selesai}</p>
                </div>
              </div>
            </div>

            {/* TABEL DATA */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  {["BELUM DIKERJAKAN", "DIPROSES", "SELESAI"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === tab ? "bg-[#0f172a] text-white shadow-lg" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-80">
                  <input type="text" placeholder="Cari NIK atau Nama..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium" />
                  <span className="absolute left-5 top-3.5 text-slate-400">🔍</span>
                </div>
              </div>

              <div className="overflow-x-auto p-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-[0.15em] font-black border-b border-slate-50">
                      <th className="px-6 py-6">No</th>
                      <th className="px-6 py-6">No. Tiket</th>
                      <th className="px-6 py-6">Jenis Surat</th>
                      <th className="px-6 py-6">Pemohon</th>
                      <th className="px-6 py-6 text-center">Status & Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    {filteredData.map((item, index) => (
                      <tr key={item.id || index} className="border-b border-slate-50 hover:bg-slate-50/80 transition-all group">
                        <td className="px-6 py-6 text-slate-400">{index + 1}</td>
                        <td className="px-6 py-6 font-bold text-blue-600 tracking-tight">{item.tiket}</td>
                        <td className="px-6 py-6 font-bold text-slate-700 text-base">{item.jenis}</td>
                        <td className="px-6 py-6 text-slate-600 text-base">{item.pemohon}</td>
                        <td className="px-6 py-6 text-center">
                          <select 
                            value={item.status} 
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`text-xs font-black uppercase px-4 py-3 rounded-xl border-2 outline-none cursor-pointer transition-all shadow-sm hover:shadow-md ${getStatusStyle(item.status)}`}
                          >
                            <option value="BELUM DIKERJAKAN">🔴 Belum Dikerjakan</option>
                            <option value="SEDANG DIPROSES">🟡 Sedang Diproses</option>
                            <option value="SELESAI">🟢 Selesai</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <AdminTemplate />
        )}
      </main>
    </div>
  );
}