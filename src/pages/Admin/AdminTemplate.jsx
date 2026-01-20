import React from "react";
import { Save, Info, Printer } from "lucide-react";

export default function AdminTemplate() {
  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-[#1E3A8A] text-3xl font-black uppercase tracking-tighter text-left">Editor Template</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-1 text-left">Pekon Kandang Besi</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-slate-50">
            <Printer size={16} /> Cetak Sample
          </button>
          <button className="bg-[#1E3A8A] text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-blue-200 transition-all hover:bg-blue-900">
            <Save size={16} /> Simpan Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Sisi Kiri: Kontrol */}
        <div className="space-y-6 text-left">
          <div className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
            <h3 className="text-[#1E3A8A] font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Pengaturan Font
            </h3>
            <p className="text-sm font-bold text-slate-500 mb-4">Font Aktif: <span className="text-[#1E3A8A]">Times New Roman (Serif)</span></p>
           <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
  <p className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest leading-relaxed">
    Sistem otomatisasi dokumen ini telah dikonfigurasi sesuai standar tata naskah dinas Pemerintah Pekon Kandang Besi. 
    Seluruh data pemohon akan diintegrasikan secara presisi ke dalam format surat yang tersedia.
  </p>
</div>
          </div>
        </div>

        {/* Sisi Kanan: Preview Surat (Kertas A4 Style) */}
        <div className="bg-white p-[2cm] rounded-sm border border-slate-300 shadow-2xl min-h-[29.7cm] w-full text-black mx-auto" 
             style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          
          {/* KOP SURAT */}
          <div className="text-center border-b-[3px] border-black pb-2 mb-8">
            <h3 className="font-bold text-[16pt] uppercase leading-tight">Pemerintah Pekon Kandang Besi</h3>
            <h3 className="font-bold text-[16pt] uppercase leading-tight">Kecamatan Kotaagung Barat</h3>
            <h3 className="font-bold text-[16pt] uppercase leading-tight">Kabupaten Tanggamus</h3>
            <p className="text-[10pt] italic mt-1">Alamat : Jl.Ir.H.Juanda KM 07 Pekon Kandang Besi Kec.Kotaagung Barat Kab.Tanggamus Kode Pos 35651</p>
          </div>

          {/* JUDUL SURAT */}
          <div className="text-center mb-10">
            <h4 className="font-bold text-[14pt] underline uppercase tracking-tight">Surat Keterangan Domisili</h4>
            <p className="text-[12pt]">Nomor : 470 / 019 / 60.2005 / XII / 2025</p>
          </div>

          {/* ISI SURAT */}
          <div className="text-[12pt] space-y-6 leading-relaxed text-justify">
            <p>Yang bertanda tangan dibawah ini Kepala Pekon Kandang Besi Kec. Kotaagung Barat Kab. Tanggamus, dengan ini menerangkan bahwa :</p>
            
            <div className="pl-12 space-y-2">
              <table className="w-full">
                <tbody>
                  <tr><td className="w-40">Nama</td><td className="w-4">:</td><td className="font-bold uppercase">Rusdi</td></tr>
                  <tr><td>Tempat, Tgl Lahir</td><td>:</td><td>Sanggi, 06-05-1978</td></tr>
                  <tr><td>No. NIK</td><td>:</td><td>1806251010820003</td></tr>
                  <tr><td>Jenis Kelamin</td><td>:</td><td>Laki-Laki</td></tr>
                  <tr><td>Pekerjaan</td><td>:</td><td>Petani/Pekebun</td></tr>
                  <tr><td>Agama</td><td>:</td><td>Islam</td></tr>
                  <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td>Pekon Kandang Besi Kecamatan Kotaagung Barat, Kabupaten Tanggamus.</td></tr>
                </tbody>
              </table>
            </div>

            <p>
              Adalah benar bertempat tinggal lebih dari 3 (tiga) tahun berturut-turut dan benar berdomisili di Pekon Kandang Besi Kecamatan Kotaagung Barat Kabupaten Tanggamus.
            </p>
            <p>
              Demikian surat keterangan Domisili ini dibuat agar dapat digunakan sebagaimana mestinya.
            </p>
          </div>

          {/* TANDA TANGAN */}
          <div className="mt-16 ml-auto w-[7cm] text-center">
            <p className="text-[12pt]">Kandang Besi, 30 Desember 2025</p>
            <p className="text-[12pt] font-bold mb-24">Kepala Pekon Kandang Besi</p>
            <p className="font-bold text-[12pt] underline uppercase">Mukhtar</p>
          </div>

        </div>
      </div>
    </div>
  );
}