import connection from "../config/database.js";
import pemilikHidroponik from "../migrations/pemilik_hidroponik.js";
import plan from "../migrations/plan.js";
import plant from "../migrations/plant.js";
import planting from "../migrations/planting.js";
import logs from "../migrations/logs.js";

// Semua migrasi di bawah ini idempotent (CREATE TABLE IF NOT EXISTS, dan
// ALTER TABLE yang mengabaikan error "kolom sudah ada"), jadi aman
// dipanggil berkali-kali -- baik lewat `npm run migrate` maupun otomatis
// setiap kali server dinyalakan.
const runMigrations = async (db = connection) => {
  await pemilikHidroponik(db);
  await plant(db);
  await plan(db);
  await planting(db);
  await logs(db);
};

export default runMigrations;
