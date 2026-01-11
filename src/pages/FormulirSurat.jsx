import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function FormulirSurat() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tempatLahir: "",
    tglLahir: "",
    jenisKelamin: "",
    agama: "",
    status: "",
    pekerjaan: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Surat berhasil diajukan! Silakan tunggu verifikasi petugas.");
    navigate("/beranda");
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* HEADER BIRU (Tanpa Navbar/Top Bar di atasnya) */}
      <div className="bg-[#1E3A8A] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Desa */}
            <div className="bg-white p-2 rounded-full w-14 h-14 flex items-center justify-center text-[#1E3A8A] font-bold text-[10px] text-center leading-tight shadow-lg">
              Desa <br /> Way Galih
            </div>
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wider">Surat Keterangan Domisili</h1>
              <p className="text-sm opacity-80">Layanan pengurusan surat secara online - mudah & cepat.</p>
            </div>
          </div>
          
          {/* Tombol Kembali (Opsional tapi membantu warga) */}
          <button 
            onClick={() => navigate(-1)}
            className="hidden md:block bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-all border border-white/30"
          >
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-8 mb-20">
        {/* Card Utama */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-white border-b py-5 text-center font-bold text-[#1E3A8A] uppercase tracking-widest text-sm shadow-sm">
            Formulir Surat Keterangan Domisili
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
            
            {/* I. DATA DIRI */}
            <section>
              <h3 className="text-[#1E3A8A] font-bold mb-8 flex items-center gap-2 text-lg border-l-4 border-[#F97316] pl-4">
                I. DATA DIRI 
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Nama Lengkap *</label>
                  <input type="text" required placeholder="Masukkan nama lengkap" className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">NIK *</label>
                  <input type="text" required placeholder="16 digit NIK" className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Tempat Lahir *</label>
                  <input type="text" required placeholder="Masukkan tempat lahir" className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Tanggal Lahir *</label>
                  <input type="date" required className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Jenis Kelamin *</label>
                  <select required className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">-- Pilih --</option>
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Agama *</label>
                  <select required className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">-- Pilih Agama --</option>
                    <option>Islam</option>
                    <option>Kristen</option>
                    <option>Katolik</option>
                    <option>Hindu</option>
                    <option>Buddha</option>
                    <option>Khonghucu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Status Perkawinan *</label>
                  <select required className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">-- Pilih Status --</option>
                    <option>Belum Kawin</option>
                    <option>Kawin</option>
                    <option>Cerai Hidup</option>
                    <option>Cerai Mati</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Pekerjaan *</label>
                  <input type="text" required placeholder="Masukkan pekerjaan" className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </section>

            {/* II. LAMPIRAN */}
            <section>
              <h3 className="text-[#1E3A8A] font-bold mb-8 flex items-center gap-2 text-lg border-l-4 border-[#F97316] pl-4">
                II. LAMPIRAN PERSYARATAN
              </h3>
              
              <div className="space-y-6">
                {[
                  { id: "ktp", label: "Unggah KTP" },
                  { id: "kk", label: "Unggah Kartu Keluarga (KK)" },
                  { id: "rt", label: "Unggah Surat Pengantar RT/RW" }
                ].map((item) => (
                  <div key={item.id}>
                    <label className="block text-xs font-bold text-slate-600 mb-3 uppercase tracking-wide">{item.label} *</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 flex items-center justify-between hover:bg-blue-50 hover:border-blue-400 transition-all group">
                      <input type="file" required className="text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#1E3A8A] file:text-white hover:file:bg-blue-800 cursor-pointer" />
                      <span className="hidden md:block text-slate-400 text-xs italic group-hover:text-blue-500">Format: JPG, PNG, atau PDF (Maks. 2MB)</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BUTTON SUBMIT */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 italic">* Pastikan semua data yang Anda isi sudah benar.</p>
              <button 
                type="submit" 
                className="bg-[#1E3A8A] hover:bg-blue-900 text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 uppercase tracking-widest text-sm"
              >
                Kirim 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}