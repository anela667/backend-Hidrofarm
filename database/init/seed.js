import runSeeders from "./runSeeders.js";

const seed = async () => {
  try {
    await runSeeders();
    console.log("Seeder berhasil.");
  } catch (error) {
    console.error("Terjadi kesalahan dalam migrasi:", error);
  } finally {
    process.exit(0);
  }
};

await seed();
