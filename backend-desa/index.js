const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. --- LOGIKA MENGAMBIL DATA (GET) ---
app.get('/api/pengajuan', (req, res) => {
    const data = fs.readFileSync('./data_pengajuan.json');
    const pengajuan = JSON.parse(data);
    res.json(pengajuan);
});

// 2. --- LOGIKA UPDATE DATA (POST) ---
app.post('/api/pengajuan/update', (req, res) => {
    const { id, status } = req.body; 
    
    const data = fs.readFileSync('./data_pengajuan.json');
    let pengajuan = JSON.parse(data);
    
    pengajuan = pengajuan.map(item => 
        item.id === id ? { ...item, status: status } : item
    );
    
    fs.writeFileSync('./data_pengajuan.json', JSON.stringify(pengajuan, null, 2));
    res.json({ message: "Status berhasil diupdate!" });
});

// 3. --- JALANKAN SERVER (HARUS DI PALING BAWAH) ---
app.listen(PORT, () => {
    console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});