const seedPlant = async (db) => {
  const plantData = [["Sawi"], ["Selada"], ["Tomat Ceri"]];

  try {
    
    const existing = await new Promise((resolve, reject) => {
      db.query("SELECT name FROM plant", (error, results) => {
        if (error) return reject(error);
        resolve(results.map((row) => row.name));
      });
    });

    const dataBaru = plantData.filter(([name]) => !existing.includes(name));

    if (dataBaru.length === 0) {
      console.log("Plant sudah lengkap, tidak ada data baru untuk di-seed.");
      return;
    }

    const query = `
        INSERT INTO plant (name)
        VALUES ?
      `;

    await new Promise((resolve, reject) => {
      db.query(query, [dataBaru], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
    console.log(
      "Plant successfully seeded:",
      dataBaru.map(([name]) => name).join(", ")
    );
  } catch (error) {
    console.error("Error seeding Plant:", error);
  }
};

export default seedPlant;
