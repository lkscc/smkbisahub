const express = require('express');
const cors = require('cors');
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const getDbConnection = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const snsClient = new SNSClient({ region: process.env.AWS_REGION || "us-east-1" });

// Endpoint wajib untuk Target Group Health Check (Application Load Balancer)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy', message: 'lks-app-node is running' });
});

// Endpoint untuk testing koneksi Database
app.get('/api/test-db', async (req, res) => {
    try {
        const db = await getDbConnection();
        const [rows] = await db.query('SELECT * FROM pendaftaran_magang');
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Endpoint Pendaftaran & Integrasi Notifikasi SNS (Modul 2)
app.post('/api/register', async (req, res) => {
    try {
        const { nama_siswa, nisn, jurusan, perusahaan_tujuan } = req.body;
        
        const db = await getDbConnection();
        await db.query(
            'INSERT INTO pendaftaran_magang (nama_siswa, nisn, jurusan, perusahaan_tujuan) VALUES (?, ?, ?, ?)',
            [nama_siswa, nisn, jurusan, perusahaan_tujuan]
        );

        // TODO: LKS CHALLENGE - Kirim notifikasi ke Amazon SNS
        if (process.env.SNS_TOPIC_ARN) {
            const params = {
                TopicArn: process.env.SNS_TOPIC_ARN,
                Message: `Pendaftaran Baru: ${nama_siswa} (${jurusan}) mendaftar ke ${perusahaan_tujuan}`,
                Subject: "Notifikasi Sistem SMK BISA Hub"
            };
            await snsClient.send(new PublishCommand(params));
        }

        res.status(201).json({ success: true, message: 'Pendaftaran berhasil disimpan.' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
