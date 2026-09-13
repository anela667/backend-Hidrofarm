import connection from "../config/database.js";
import seedPemilikHidroponik from "../seeder/pemilik_hidroponik.js";
import seedPlant from "../seeder/plant.js";
import seedPlanting from "../seeder/planting.js";

// Semua seeder di bawah ini sudah mengecek data yang sudah ada sebelum
// insert (skip kalau sudah lengkap), jadi aman dipanggil berkali-kali.
// Ini penting supaya data tanaman/jadwal baru (mis. Tomat Ceri) otomatis
// ikut masuk ke database begitu server dinyalakan ulang, tanpa developer
// harus ingat menjalankan `npm run seed` secara manual tiap kali ada
// tanaman atau jadwal baru yang ditambahkan di kode.
const runSeeders = async (db = connection) => {
  await seedPemilikHidroponik(db);
  await seedPlant(db);
  await seedPlanting(db);
};

export default runSeeders;
