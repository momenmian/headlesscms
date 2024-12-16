import mysql from 'mysql2/promise';
import { ENV_CONFIG } from './environment';

export const dbConfig = {
    host: '192.254.186.198',
    user: 'firozem_osbdcms',
    password: 'osbdcms@1234',
    database: 'firozem_headlesscms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

export const createPool = async () => {
    try {
        const pool = mysql.createPool(dbConfig);
        await pool.getConnection(); // Test connection
        return pool;
    } catch (error) {
        throw new Error(`Database connection failed: ${error}`);
    }
};