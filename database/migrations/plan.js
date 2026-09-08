const run = (db, query) =>
  new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });

// Kolom `count` sekarang diisi otomatis (estimasi jumlah tanaman hasil
// perhitungan luas lahan x kepadatan tanam per metode), bukan input manual
// user lagi. `area` = luas lahan (m2) yang diinput user, `method` = metode
// hidroponik yang dipilih (NFT / Wick System) yang juga dipakai untuk
// menentukan jadwal kegiatan (tabel planting) yang sesuai.
const plan = async (db) => {
  const query = `
      CREATE TABLE IF NOT EXISTS plan (
        id_plan INT AUTO_INCREMENT PRIMARY KEY,
        id_pemilik INTEGER NOT NULL,
        id_plant INTEGER NOT NULL,
        method VARCHAR(50) NOT NULL DEFAULT 'Wick System',
        area DECIMAL(6,2) NOT NULL DEFAULT 1,
        count INTEGER NOT NULL,
        started_at DATE DEFAULT (CURRENT_DATE),
        FOREIGN KEY (id_pemilik) REFERENCES pemilik_hidroponik(id_pemilik),
        FOREIGN KEY (id_plant) REFERENCES plant(id)
      )ENGINE=InnoDB;
    `;

  await run(db, query);

  // Untuk database yang sudah ada sebelum revisi ini (tabel plan sudah
  // dibuat tanpa kolom area/method), tambahkan kolomnya di sini supaya
  // tidak perlu drop tabel manual. Error "Duplicate column" diabaikan.
  const alterStatements = [
    "ALTER TABLE plan ADD COLUMN method VARCHAR(50) NOT NULL DEFAULT 'Wick System'",
    "ALTER TABLE plan ADD COLUMN area DECIMAL(6,2) NOT NULL DEFAULT 1",
  ];

  for (const statement of alterStatements) {
    try {
      await run(db, statement);
    } catch (error) {
      if (error.code !== "ER_DUP_FIELDNAME") {
        console.error("Gagal menjalankan migrasi tambahan plan:", error.message);
      }
    }
  }

  console.log("Tabel 'plan' berhasil dibuat/diperbarui.");
};

export default plan;
