import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BuatSurat() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. PROTEKSI HALAMAN (Auth Guard)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login"); 
    }
  }, [navigate]);

  // 2. DATA MEKANISME
  const mekanisme = [
    { id: 1, judul: "Cari Surat", desc: "Temukan surat melalui kolom pencarian.", svg: (<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>) },
    { id: 2, judul: "Isi Data", desc: "Lengkapi data diri pada formulir online.", svg: (<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>) },
    { id: 3, judul: "Verifikasi", desc: "Tunggu validasi data oleh petugas desa.", svg: (<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04z" /></svg>) },
    { id: 4, judul: "Selesai", desc: "Surat dapat diambil di Kantor Desa.", svg: (<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>) },
  ];

  // 3. DATA DAFTAR SURAT
  const daftarSurat = [
    { id: 1, nama: "Surat Pengantar KTP", deskripsi: "Untuk pembuatan atau perpanjangan KTP" },
    { id: 2, nama: "Surat Keterangan Domisili", deskripsi: "Keterangan tempat tinggal penduduk di desa" },
    { id: 3, nama: "Surat Keterangan Domisili Perusahaan", deskripsi: "Keterangan domisili untuk badan usaha" },
    { id: 4, nama: "Surat Keterangan Tidak Mampu (SKTM)", deskripsi: "Untuk syarat bantuan pemerintah atau beasiswa" },
    { id: 5, nama: "Surat Keterangan Usaha (SKU)", deskripsi: "Syarat pengajuan modal atau izin usaha" },
    { id: 6, nama: "Surat Pengantar Nikah (NA)", deskripsi: "Persyaratan administrasi ke KUA" },
    { id: 7, nama: "Surat Keterangan Kelahiran", deskripsi: "Dasar pengurusan akta kelahiran" },
    { id: 8, nama: "Surat Keterangan Kematian", deskripsi: "Bukti administratif pelaporan kematian" },
  ];

  const filteredSurat = daftarSurat.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        
        {/* HEADER MEKANISME */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#1E3A8A] uppercase tracking-tight">Mekanisme Layanan Surat</h1>
          <div className="h-1 w-12 bg-[#F97316] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* GRID MEKANISME */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {mekanisme.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center relative">
              <span className="absolute -top-2 -right-2 bg-[#1E3A8A] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px]">{item.id}</span>
              <div className="flex justify-center mb-3">{item.svg}</div>
              <h3 className="text-[13px] font-bold text-[#1E3A8A] mb-1 uppercase tracking-wide">{item.judul}</h3>
              <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* SECTION SEARCH & LIST */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-10 rounded-[24px] shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-[#1E3A8A] uppercase mb-6 tracking-widest text-center italic opacity-70">Cari & Pilih Jenis Surat</h2>

            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Cari surat di sini..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none text-sm font-medium transition-all"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30 text-sm">🔍</span>
            </div>

            <div className="space-y-3">
              {filteredSurat.length > 0 ? (
                filteredSurat.map((surat) => (
                  <button
                    key={surat.id}
                    /* UPDATE: Tambahkan fungsi navigasi ke halaman formulir */
                    onClick={() => navigate("/formulir-surat")} 
                    className="w-full bg-[#1E3A8A] hover:bg-[#162447] p-4 rounded-xl flex items-center justify-between text-white transition-all group active:scale-[0.99] shadow-md border-b-2 border-black/20"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7h-4V5l4 4z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold tracking-wide">{surat.nama}</h4>
                        <p className="text-[10px] text-blue-200 font-normal opacity-70 mt-0.5">{surat.deskripsi}</p>
                      </div>
                    </div>
                    <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400 font-medium text-xs italic tracking-wide">Surat "{searchTerm}" tidak ditemukan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}