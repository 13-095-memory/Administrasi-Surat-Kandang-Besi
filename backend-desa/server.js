const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. KONEKSI KE MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'desa_kandang_besi' 
});

db.connect(err => {
    if (err) console.error('DATABASE ERROR: Cek XAMPP kamu!');
    else console.log('✅ Berhasil Terhubung ke MySQL');
});

// 2. SETTING UPLOAD BERKAS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './Uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });
app.use('/uploads', express.static('Uploads'));

// --- 3. API AUTH & PROFIL WARGA ---
// (Tetap sama seperti kode kamu sebelumnya...)
app.post('/api/auth/register', (req, res) => {
    const { nama_lengkap, nik, password } = req.body;
    const sql = "INSERT INTO warga (nama_lengkap, nik, password) VALUES (?, ?, ?)";
    db.query(sql, [nama_lengkap, nik, password], (err, result) => {
        if (err) return res.status(500).json({ error: "NIK sudah terdaftar" });
        res.json({ message: "Akun warga berhasil dibuat!" });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { nama_lengkap, password } = req.body;
    const sql = "SELECT * FROM warga WHERE nama_lengkap = ? AND password = ?";
    db.query(sql, [nama_lengkap, password], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) res.json({ message: "Login Berhasil", profil: result[0] });
        else res.status(401).json({ error: "Nama atau Password salah!" });
    });
});

// --- 4. API ADMIN & PENGAJUAN ---

// Warga Mengajukan Surat
app.post('/api/pengajuan', upload.any(), (req, res) => {
    const { nik_pengaju, nama_warga, jenis_surat, data_form } = req.body;
    const uploadedFiles = {};
    if (req.files) {
        req.files.forEach(file => { uploadedFiles[file.fieldname] = file.filename; });
    }
    const fullData = { ...JSON.parse(data_form || '{}'), berkas: uploadedFiles };

    const sql = "INSERT INTO pengajuan (nik_pengaju, nama_warga, jenis_surat, data_form) VALUES (?, ?, ?, ?)";
    db.query(sql, [nik_pengaju, nama_warga, jenis_surat, JSON.stringify(fullData)], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Pengajuan Terkirim!" });
    });
});

// Ambil List Pengajuan (Admin)
app.get('/api/pengajuan', (req, res) => {
    const sql = "SELECT * FROM pengajuan ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Ambil Status Pengajuan (Warga)
app.get('/api/pengajuan-warga/:nik', (req, res) => {
    const sql = "SELECT * FROM pengajuan WHERE nik_pengaju = ? ORDER BY created_at DESC";
    db.query(sql, [req.params.nik], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// --- FITUR FINALISASI (HANYA PAKAI SATU INI) ---
app.put("/api/pengajuan/finalkan/:id", (req, res) => {
    const { id } = req.params;
    const { status, data_final } = req.body; 

    // Debugging: Cek di terminal terminal VS Code kamu apakah data masuk
    console.log(`Mengupdate Pengajuan ID: ${id} menjadi status: ${status}`);

    const sql = "UPDATE pengajuan SET status = ?, data_final = ? WHERE id = ?";
    
    // Kita pastikan data_final disimpan sebagai string JSON
    db.query(sql, [status, JSON.stringify(data_final), id], (err, result) => {
        if (err) {
            console.error("DATABASE ERROR:", err);
            return res.status(500).json({ error: "Gagal update database" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ID Pengajuan tidak ditemukan di database" });
        }

        res.json({ message: "Surat berhasil dikirim ke warga!" });
    });
});

app.listen(PORT, () => console.log(`🚀 Server jalan di port ${PORT}`));