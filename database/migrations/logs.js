const logs = async (db) => {
  const query = `
      CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plan_id INTEGER NOT NULL,
        succes INTEGER NOT NULL,
        fail INTEGER NOT NULL,
        FOREIGN KEY (plan_id) REFERENCES plan(id_plan)
      )ENGINE=InnoDB;
    `;
  await new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
  console.log("Tabel 'logs' berhasil dibuat.");
};

export default logs;
