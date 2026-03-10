/**
 * TODO: LKS CHALLENGE (MODUL 2)
 * Variabel ini akan otomatis diisi oleh AWS Amplify saat proses Build.
 * Pastikan Anda menambahkan REACT_APP_API_URL pada menu 'Environment variables' di AWS Amplify Console.
 * Nilainya adalah DNS Name dari Application Load Balancer (ALB) Anda (http://lks-alb-xxx.elb.amazonaws.com)
 */

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
