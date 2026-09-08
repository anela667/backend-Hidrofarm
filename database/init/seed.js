import connection from "../config/database.js";
import seedPemilikHidroponik from "../seeder/pemilik_hidroponik.js";
import seedPlant from "../seeder/plant.js";
import seedPlanting from "../seeder/planting.js";


const seed = async () => {
  try {
    await seedPemilikHidroponik(connection);
    await seedPlant(connection);
    await seedPlanting(connection);
    console.log("Seeder berhasil.");
  } catch (error) {
    console.error("Terjadi kesalahan dalam migrasi:", error);
  } finally {
    process.exit(0); 
  }
};

await seed();
