import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

// Check for missing environment variables
const requiredEnv = ['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_NAME'];
for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // Use encryption for Azure SQL Database
        trustServerCertificate: true, // Change to false if you have a valid certificate
        enableArithAbort: true // Required for SQL Server 2019 and later
    }
};

export const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server!');
        return pool;
    })
    .catch(err => {
        console.log('Database connection failed: ', err);
    })


