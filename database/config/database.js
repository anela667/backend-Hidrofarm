import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();


const connection = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Database gagal terhubung:", err);
  } else {
    console.log("✅ Database terhubung");
    conn.release();
  }
});

export default connection;
