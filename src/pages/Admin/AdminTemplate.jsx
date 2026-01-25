import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

export default function AdminTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const suratRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { id_pengajuan, warga, jenis_surat } = location.state || {};

  const [formData, setFormData] = useState({
    nomorSurat: jenis_surat === "SKU" ? "470 / ___ / 60.2005 / I / 2026" : "470 / ___ / 60.2005 / XII / 2025",
    nama: warga?.nama || "",
    nik: warga?.nik || "",
    ttl: warga?.ttl || "",
    pekerjaan: warga?.pekerjaan || "",
    alamat: warga?.alamat || "",
    agama: warga?.agama || "",
    jenisKelamin: warga?.jenisKelamin || "Laki-Laki",
    statusKawin: "Kawin",
    // Field baru agar bisa diedit manual sesuai kebutuhan 
    lamaDomisili: "3 ( tiga )", 
    namaUsaha: "JUAL BELI HASIL BUMI", 
    tahunUsaha: "2021",
    tglSurat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    penandatangan: "MUKHTAR",
    jabatan: "Kepala Pekon Kandang Besi"
  });

  const handleFinalisasiSurat = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/pengajuan/finalkan/${id_pengajuan}`, {
        status: "Selesai",
        data_final: JSON.stringify(formData)
      });

      const element = suratRef.current;
      const canvas = await html2canvas(element, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`Surat_${jenis_surat}_${formData.nama}.pdf`);

      alert("Surat Berhasil Diarsip dan Dikirim!");
      navigate("/admin/pengajuan");
    } catch (error) {
      alert("Gagal memproses surat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* PANEL EDITOR (KIRI) */}
      <div className="w-1/3 bg-white p-8 overflow-y-auto shadow-xl text-left">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 font-bold text-[#1E3A8A]">
          <ArrowLeft size={18}/> KEMBALI
        </button>
        <h2 className="font-black uppercase text-xs mb-8 tracking-[0.2em] text-slate-400">Pengaturan Isi Surat</h2>
        
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">Nomor Surat Resmi</label>
            <input type="text" value={formData.nomorSurat} onChange={(e) => setFormData({...formData, nomorSurat: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
          </div>
          
          {/* Input dinamis untuk lama domisili  */}
          {jenis_surat !== "SKU" && (
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400">Lama Tinggal (Tahun)</label>
              <input type="text" value={formData.lamaDomisili} onChange={(e) => setFormData({...formData, lamaDomisili: e.target.value})} placeholder="Contoh: 5 ( lima )" className="w-full p-3 bg-blue-50 rounded-xl border border-blue-200 font-bold text-blue-700" />
            </div>
          )}

          {jenis_surat === "SKU" && (
            <>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">Nama Usaha</label>
                <input type="text" value={formData.namaUsaha} onChange={(e) => setFormData({...formData, namaUsaha: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400">Penandatangan</label>
              <input type="text" value={formData.penandatangan} onChange={(e) => setFormData({...formData, penandatangan: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold" />
            </div>
          </div>
        </div>

        <button onClick={handleFinalisasiSurat} disabled={loading} className="w-full mt-10 bg-[#1E3A8A] text-white py-5 rounded-[24px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
          {loading ? <Loader2 className="animate-spin"/> : <Send size={18}/>}
          {loading ? "MENYIMPAN..." : "FINALKAN & KIRIM"}
        </button>
      </div>

      {/* PREVIEW SURAT (KANAN) */}
      <div className="flex-1 overflow-y-auto p-12 bg-slate-200 flex justify-center">
        <div ref={suratRef} className="w-[210mm] min-h-[297mm] bg-white p-[20mm] shadow-2xl text-left text-black" style={{ fontFamily: "'Times New Roman', Times, serif", lineHeight: "1.5" }}>
          
          {/* KOP SURAT [cite: 1, 2, 3, 4] */}
          <div className="text-center border-b-[3px] border-black pb-1 mb-1">
             <h2 className="text-[16pt] font-bold uppercase leading-tight">Pemerintah Kabupaten Tanggamus [cite: 3]</h2>
             <h2 className="text-[16pt] font-bold uppercase leading-tight">Kecamatan Kotaagung Barat [cite: 2]</h2>
             <h1 className="text-[18pt] font-extrabold uppercase leading-tight">Pekon Kandang Besi [cite: 1]</h1>
             <p className="text-[10pt] italic">Alamat : Jl. Ir. H. Juanda Km 07 Pekon Kandang Besi Kec. Kotaagung Barat Kab. Tanggamus Kode Pos : 35651 [cite: 4]</p>
          </div>
          <div className="border-b-[1px] border-black mb-6"></div>

          <div className="text-center mb-8">
             <h3 className="text-[14pt] font-bold underline uppercase underline-offset-4">
               {jenis_surat === "SKU" ? "Surat Keterangan Usaha" : "Surat Keterangan Domisili"}
             </h3>
             <p className="text-[12pt]">Nomor : {formData.nomorSurat}</p>
          </div>

          <div className="text-[12pt] space-y-4">
             <p>Yang bertanda tangan di bawah ini Kepala Pekon Kandang Besi Kec. Kotaagung Barat Kab. Tanggamus menerangkan dengan sebenarnya bahwa: [cite: 7, 26]</p>
             
             <div className="ml-8 space-y-1">
                <table className="w-full">
                  <tbody>
                    <tr><td className="w-44">Nama</td><td>: <b>{formData.nama}</b></td></tr>
                    <tr><td>NIK</td><td>: {formData.nik}</td></tr>
                    <tr><td>Tempat, Tgl Lahir</td><td>: {formData.ttl}</td></tr>
                    <tr><td>Agama</td><td>: {formData.agama}</td></tr>
                    <tr><td>Alamat</td><td>: {formData.alamat}</td></tr>
                  </tbody>
                </table>
             </div>

             {/* BAGIAN YANG SEKARANG DINAMIS [cite: 15, 36, 79] */}
             {jenis_surat === "SKU" ? (
               <div className="space-y-4">
                 <p>Nama tersebut di atas adalah penduduk Pekon Kandang Besi yang bertempat tinggal di wilayah Kandang Besi. [cite: 78]</p>
                 <p>Nama tersebut di atas membuka usaha <span className="font-bold">"{formData.namaUsaha}"</span> yang berlokasi di wilayah Pekon Kandang Besi sejak tahun {formData.tahunUsaha} sampai berjalan saat ini. [cite: 79]</p>
               </div>
             ) : (
               <p>Adalah benar bertempat tinggal lebih dari <span className="font-bold underline">{formData.lamaDomisili}</span> tahun berturut-turut dan benar berdomisili di Pekon Kandang Besi Kecamatan Kotaagung Barat Kabupaten Tanggamus. </p>
             )}

             <p className="pt-4">Demikian surat keterangan ini dibuat dengan sebenar-benarnya untuk digunakan sebagaimana mestinya. [cite: 16, 37, 80]</p>
          </div>

          {/* TANDA TANGAN [cite: 17, 18, 19] */}
          <div className="mt-12 ml-auto w-72 text-center">
             <p>Kandang Besi, {formData.tglSurat}</p>
             <p className="font-bold">{formData.jabatan}</p>
             <div className="h-24"></div>
             <p className="font-bold uppercase underline underline-offset-4">{formData.penandatangan} [cite: 19]</p>
          </div>

        </div>
      </div>
    </div>
  );
}