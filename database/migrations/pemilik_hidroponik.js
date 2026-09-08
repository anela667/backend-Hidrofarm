const pemilikHidroponik = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS pemilik_hidroponik (
      id_pemilik INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )ENGINE=InnoDB;
  `;
  await new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
  console.log("Tabel 'pemilik_hidroponik' berhasil dibuat.");
};

export default pemilikHidroponik;
