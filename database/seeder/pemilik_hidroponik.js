const seedPemilikHidroponik = async (db) => {
  const usersData = [
    ["Admin", "admin@admin.com", "admin"],
    
  ];

  try {
    const query = `
        INSERT INTO pemilik_hidroponik (name, email, password)
        VALUES ?
      `;

    await new Promise((resolve, reject) => {
        db.query(query, [usersData], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
    console.log("Pemilik hidroponik successfully seeded.");
  } catch (error) {
    console.error("Error seeding pemilik_hidroponik:", error);
  }
};

export default seedPemilikHidroponik;
