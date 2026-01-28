const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("./uploads")) { fs.mkdirSync("./uploads"); }

// --- DATABASE CONNECTION (SUPABASE/POSTGRES) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ambil dari Environment Variable Vercel
  ssl: { rejectUnauthorized: false } // Wajib untuk koneksi cloud seperti Supabase
});

pool.connect((err) => {
  if (err) console.error("Database Supabase Gagal:", err.stack);
  else console.log("Database Supabase (PostgreSQL) Terhubung!");
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); }
});
const upload = multer({ storage });

// --- API AUTHENTICATION ---
app.get("/api/auth/check-nik/:nik", (req, res) => {
  // Ganti ? menjadi $1
  pool.query("SELECT nik FROM warga WHERE nik = $1", [req.params.nik], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ available: result.rows.length === 0 });
  });
});

app.post("/api/auth/register", (req, res) => {
  const { nama_lengkap, nik, no_telp, password } = req.body;
  const sql = "INSERT INTO warga (nama_lengkap, nik, no_hp, password) VALUES ($1, $2, $3, $4)";
  pool.query(sql, [nama_lengkap, nik, no_telp, password], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Registrasi Berhasil!" });
  });
});

app.post("/api/auth/login", (req, res) => {
  const { nama_lengkap, password } = req.body;
  const sqlAdmin = "SELECT *, 'admin' as role FROM admin WHERE username = $1 AND password = $2";
  pool.query(sqlAdmin, [nama_lengkap, password], (err, adminRes) => {
    if (adminRes && adminRes.rows.length > 0) return res.json({ profil: adminRes.rows[0] });
    
    const sqlWarga = "SELECT *, 'warga' as role FROM warga WHERE nama_lengkap = $1 AND password = $2";
    pool.query(sqlWarga, [nama_lengkap, password], (err, wargaRes) => {
      if (wargaRes && wargaRes.rows.length > 0) return res.json({ profil: wargaRes.rows[0] });
      res.status(401).json({ error: "Akun tidak ditemukan!" });
    });
  });
});

// --- API PENGAJUAN ---
app.post("/api/pengajuan", upload.any(), (req, res) => {
  const { nik_pengaju, nama_warga, jenis_surat, data_form } = req.body;
  let parsedData = JSON.parse(data_form);
  const berkas = {};
  if (req.files) req.files.forEach(f => berkas[f.fieldname] = f.filename);
  parsedData.berkas = berkas;
  
  const sql = "INSERT INTO pengajuan (nik_pengaju, nama_warga, jenis_surat, data_form, status) VALUES ($1, $2, $3, $4, 'Pending')";
  pool.query(sql, [nik_pengaju, nama_warga, jenis_surat, JSON.stringify(parsedData)], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Berhasil!" });
  });
});

app.get("/api/pengajuan", (req, res) => {
  pool.query("SELECT * FROM pengajuan ORDER BY id DESC", (err, result) => res.json(result.rows));
});

// Tambahkan ini agar Vercel bisa mengenali app
module.exports = app;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
