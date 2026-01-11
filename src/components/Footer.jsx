export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 py-8 mt-7 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Sisi Kiri: Branding Singkat */}
          <div className="max-w-xs">
            <h4 className="text-white font-bold text-lg mb-2">SuratDesa</h4>
            <p className="text-xs leading-relaxed">
              Solusi digitalisasi layanan publik untuk mempercepat administrasi kependudukan di tingkat desa.
            </p>
          </div>

          {/* Sisi Tengah: Kontak yang Dirampingkan */}
          <div className="grid grid-cols-1 gap-3 text-xs">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-1">Kontak Kami</p>
            <div className="flex items-center gap-2">
              <span>📍</span> Jl. Balai Desa No. 45
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span> +62 812-3456-7890
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span> kontak@desaku.go.id
            </div>
          </div>

          {/* Sisi Kanan: Tautan Cepat */}
          <div className="text-xs">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-2">Tautan</p>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition-colors">• Profil Desa</li>
              <li className="hover:text-white cursor-pointer transition-colors">• Regulasi</li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[3px] opacity-50">
            © 2026 Portal Resmi SuratDesa.
          </p>
        </div>
      </div>
    </footer>
  );
}