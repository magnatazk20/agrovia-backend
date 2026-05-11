import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const DB_HOST = process.env.DB_HOST ?? '127.0.0.1'
export const DB_PORT = Number(process.env.DB_PORT ?? 3306)
export const DB_USER = process.env.DB_USER ?? 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD ?? ''
export const DB_NAME = process.env.DB_NAME ?? 'agrovia'

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
})

export default pool
