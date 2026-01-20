import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroImage from "../../assets/Surat.jpeg"; 

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E2E8F0] font-sans text-[#1E293B]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-20 bg-[#F8FAFC] p-10 md:p-14 rounded-[40px] shadow-2xl border border-white/50">
          <div className="flex-1 text-[#0F172A]">
            <h2 className="text-3xl md:text-4xl font-black leading-[1.2] mb-6 uppercase tracking-tighter">
              Portal Digital Desa Untuk <br /> 
              <span className="text-blue-600">Akses Mudah & Kemajuan Bersama</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-medium">
              Platform digital terpadu untuk mempermudah akses layanan desa dan meningkatkan transparansi pemerintahan.
            </p>
            <button 
              onClick={() => navigate("/buat-surat")}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-300 transition-all active:scale-95"
            >
              Buat Surat Sekarang
            </button>
          </div>
          <div className="flex-1 w-full">
            <div className="w-full h-[380px] bg-slate-200 rounded-[35px] overflow-hidden shadow-inner border border-slate-300">
              <img src={HeroImage} alt="Hero" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* BERITA TERKINI */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10 text-[#0F172A]">
            <h3 className="text-2xl font-bold tracking-tight uppercase text-sm">Berita Terkini</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#F8FAFC] p-7 rounded-[40px] shadow-xl border border-white/50 transition-all hover:-translate-y-2">
                <div className="h-44 bg-slate-200 rounded-[30px] mb-6"></div>
                <p className="text-red-500 text-[10px] font-black tracking-widest uppercase mb-2">Januari 2026</p>
                <h4 className="text-lg font-bold mb-3 text-[#0F172A] text-sm">Pembaruan Sistem Digital</h4>
                <p className="text-slate-500 text-xs mb-6 font-medium">Mempercepat proses birokrasi surat-menyurat dengan sistem terbaru.</p>
                <button className="w-full py-3 bg-slate-100 rounded-xl font-bold text-[10px] hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest">Selengkapnya</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}