import React from 'react';

const StatusSurat = () => {
  // Contoh data dari database (nanti ditarik dari back-end)
  const listSurat = [
    { id: 1, jenis: 'Surat Domisili', status: 'Ditolak', catatan: 'Foto KTP tidak jelas, silakan upload ulang.' },
    { id: 2, jenis: 'SKTM', status: 'Diproses', catatan: '-' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-resmi-blue">Status Pengajuan Surat Anda</h2>
      <div className="space-y-4">
        {listSurat.map((surat) => (
          <div key={surat.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">{surat.jenis}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                surat.status === 'Ditolak' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {surat.status}
              </span>
            </div>
            {surat.status === 'Ditolak' && (
              <div className="bg-red-50 p-3 rounded border border-red-100 text-sm text-red-700">
                <strong>Catatan Admin:</strong> {surat.catatan}
                <button className="block mt-2 text-blue-600 underline font-bold">Ajukan Ulang Sekarang</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSurat;