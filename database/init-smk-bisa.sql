-- DDL untuk SMK BISA Hub
CREATE DATABASE IF NOT EXISTS smk_bisa_db;
USE smk_bisa_db;

CREATE TABLE IF NOT EXISTS pendaftaran_magang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_siswa VARCHAR(100) NOT NULL,
    nisn VARCHAR(20) UNIQUE NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    perusahaan_tujuan VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pendaftaran_magang (nama_siswa, nisn, jurusan, perusahaan_tujuan) 
VALUES ('Budi Santoso', '1234567890', 'Teknik Komputer dan Jaringan', 'PT. AWS Indonesia');
