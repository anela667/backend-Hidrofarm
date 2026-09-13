import runMigrations from "./runMigrations.js";

const migrate = async () => {
  try {
    await runMigrations();
    console.log("Migrasi berhasil.");
  } catch (error) {
    console.error("Terjadi kesalahan dalam migrasi:", error);
  } finally {
    process.exit(0);
  }
};

await migrate();

