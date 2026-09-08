import connection from "../config/database.js";

const getUserById = async (id) => {
  const sql = "SELECT * FROM pemilik_hidroponik WHERE id_pemilik = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result[0] || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getUserById:", error);
  }
};

const getUserByEmail = async (email) => {
  const sql = "SELECT * FROM pemilik_hidroponik WHERE email = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [email], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result[0] || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getUserByEmail:", error);
  }
};

const createUser = async (name, email, password) => {
  const sql =
    "INSERT INTO pemilik_hidroponik (name, email, password) VALUES (?, ?, ?)";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [name, email, password], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result;
  } catch (error) {
    console.error("Terjadi kesalahan dalam createUser:", error);
  }
};

export { getUserById, getUserByEmail, createUser };