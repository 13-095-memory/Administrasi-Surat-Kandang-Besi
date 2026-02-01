const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Pastikan folder uploads ada
if (!fs.existsSync("./uploads")) { 
    fs.mkdirSync("./uploads"); 
}

// --- DATABASE CONNECTION ---
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "desa_kandang_besi",
  port: 3307 
});

db.connect((err) => {
  if (err) console.error("Database Gagal:", err);
  else console.log("Database MySQL Terhubung!");
});

// --- MULTER CONFIG ---
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => { 
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, '_')); 
  }
});
const upload = multer({ storage });

// --- AUTH API ---
app.post("/api/auth/login", (req, res) => {
  const { nama_lengkap, password } = req.body;
  const sqlAdmin = "SELECT *, 'admin' as role FROM admin WHERE username = ? AND password = ?";
  db.query(sqlAdmin, [nama_lengkap, password], (err, adminRes) => {
    if (adminRes && adminRes.length > 0) return res.json({ profil: adminRes[0] });
    const sqlWarga = "SELECT *, 'warga' as role FROM warga WHERE nama_lengkap = ? AND password = ?";
    db.query(sqlWarga, [nama_lengkap, password], (err, wargaRes) => {
      if (wargaRes && wargaRes.length > 0) return res.json({ profil: wargaRes[0] });
      res.status(401).json({ error: "Akun tidak ditemukan!" });
    });
  });
});

// --- PENGAJUAN API ---
app.post("/api/pengajuan", upload.any(), (req, res) => {
  const { nik_pengaju, nama_warga, jenis_surat, data_form } = req.body;
  let parsedData = JSON.parse(data_form || "{}");
  const berkas = {};
  if (req.files) {
    req.files.forEach(f => { berkas[f.fieldname] = f.filename; });
  }
  parsedData.berkas = berkas;

  const sql = "INSERT INTO pengajuan (nik_pengaju, nama_warga, jenis_surat, data_form, status) VALUES (?, ?, ?, ?, 'Pending')";
  db.query(sql, [nik_pengaju, nama_warga, jenis_surat, JSON.stringify(parsedData)], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Berhasil!" });
  });
});

app.get("/api/pengajuan", (req, res) => {
  db.query("SELECT * FROM pengajuan ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Update Status (Tolak/Proses)
app.put("/api/pengajuan/:id", (req, res) => {
  db.query("UPDATE pengajuan SET status = ? WHERE id = ?", [req.body.status, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Status Updated" });
  });
});

// Update Status + Simpan Arsip PDF
app.put("/api/pengajuan/arsip/:id", upload.single("pdf"), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const fileName = req.file ? req.file.filename : null;

  const sql = "UPDATE pengajuan SET status = ?, file_final = ? WHERE id = ?";
  db.query(sql, [status, fileName, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Arsip Berhasil Disimpan" });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));