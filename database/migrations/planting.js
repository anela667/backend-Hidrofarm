const run = (db, query) =>
  new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

// `method` menandakan jadwal kegiatan ini berlaku untuk metode hidroponik
// yang mana (NFT / Wick System), karena langkah perawatan NFT dan Wick
// System berbeda meskipun tanamannya sama.
const planting = async (db) => {
  const query = `
      CREATE TABLE IF NOT EXISTS planting (
        id INT AUTO_INCREMENT PRIMARY KEY,
        day INTEGER NOT NULL,
        actifity VARCHAR(255) NOT NULL,
        timeofday VARCHAR(30) NOT NULL,
        plant_id INTEGER NOT NULL,
        method VARCHAR(50) NOT NULL DEFAULT 'Wick System'
      )ENGINE=InnoDB;
    `;

  await run(db, query);

  try {
    await run(
      db,
      "ALTER TABLE planting ADD COLUMN method VARCHAR(50) NOT NULL DEFAULT 'Wick System'"
    );
  } catch (error) {
    if (error.code !== "ER_DUP_FIELDNAME") {
      console.error("Gagal menjalankan migrasi tambahan planting:", error.message);
    }
  }

  console.log("Tabel 'planting' berhasil dibuat/diperbarui.");
};

export default planting;
