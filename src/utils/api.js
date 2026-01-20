// src/utils/api.js
const api = {
  get: async (url) => {
    console.log("Mock GET request to:", url);
    return {
      data: {
        user: {
          firstName: "Budi",
          lastName: "Santoso",
          nik: "3201234567890123",
          tempatLahir: "Bandar Lampung",
          tanggalLahir: "1990-01-01",
          jenisKelamin: "Laki-laki",
          agama: "Islam",
          statusPerkawinan: "Kawin",
          pekerjaan: "Wiraswasta",
          kewarganegaraan: "Indonesia",
          phoneNumber: "08123456789"
        }
      }
    };
  },
  post: async (url, data) => {
    console.log("Mock POST request to:", url, data);
    return { data: { surat: { noTiket: "TKT-" + Date.now() } } };
  }
};

export default api;