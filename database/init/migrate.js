import connection from "../config/database.js";
import pemilikHidroponik from "../migrations/pemilik_hidroponik.js";
import plan from "../migrations/plan.js"; 
import plant from "../migrations/plant.js";
import planting from "../migrations/planting.js"; 
import logs from "../migrations/logs.js";

const migrate = async () => {
  try {
    await pemilikHidroponik(connection); 
    await plant(connection);
    await plan(connection);
    await planting(connection);
    await logs(connection);
    console.log("Migrasi berhasil.");
  } catch (error) {
    console.error("Terjadi kesalahan dalam migrasi:", error);
  } finally {
    process.exit(0); 
  }
};

await migrate(); 
