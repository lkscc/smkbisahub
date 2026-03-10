const mysql = require('mysql2/promise');
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

/**
 * TODO: LKS CHALLENGE (MODUL 3)
 * Pada Modul 1 & 2, gunakan koneksi standar menggunakan process.env.
 * Pada Modul 3, Anda WAJIB memodifikasi fungsi ini untuk mengambil kredensial 
 * dari AWS Secrets Manager bernama 'lks-db-credentials' untuk alasan keamanan.
 */

async function getDbConnection() {
    // --- MODE MODUL 1 & 2 (Plaintext ENV) ---
    // Silakan comment blok ini saat mengerjakan Modul 3
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    // --- MODE MODUL 3 (AWS Secrets Manager) ---
    /*
    const client = new SecretsManagerClient({ region: process.env.AWS_REGION || "us-east-1" });
    try {
        const response = await client.send(
            new GetSecretValueCommand({ SecretId: "lks-db-credentials" })
        );
        const secrets = JSON.parse(response.SecretString);
        
        return await mysql.createConnection({
            host: secrets.host,
            user: secrets.username,
            password: secrets.password,
            database: process.env.DB_NAME
        });
    } catch (error) {
        console.error("Gagal mengambil secret dari AWS Secrets Manager:", error);
        throw error;
    }
    */
}

module.exports = getDbConnection;
