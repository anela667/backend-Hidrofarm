const plant = async (db) => {
  const query = `
      CREATE TABLE IF NOT EXISTS plant (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )ENGINE=InnoDB;
    `;
  await new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
  console.log("Tabel 'plant' berhasil dibuat.");
};

export default plant;
