import connection from "../config/database.js";

const getPlantingByPlantId = async (plant_id) => {
  const sql = "SELECT * FROM planting WHERE plant_id = ?";
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [plant_id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    return result || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getPlantingByPlantId:", error);
  }
};

// Jadwal kegiatan (planting) sekarang juga bergantung pada metode
// hidroponik yang dipakai (NFT / Wick System), karena langkahnya beda.
const getPlantingByPlantIdAndMethod = async (plant_id, method) => {
  const sql =
    "SELECT * FROM planting WHERE plant_id = ? AND method = ? ORDER BY day ASC";
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [plant_id, method], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    return result || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getPlantingByPlantIdAndMethod:", error);
  }
};

const deletePlantingById = async (id) => {
  const sql = "DELETE FROM planting WHERE id = ?";
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    return result || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam deletePlantingById:", error);
  }
};

// Dipakai untuk fitur edit kegiatan harian (bukan hapus). Karena baris
// `planting` dipakai bareng oleh semua plan dengan jenis tanaman + metode
// yang sama, edit di sini akan mengubah jadwal itu untuk SEMUA plan yang
// memakai kombinasi tanaman + metode tersebut.
const updatePlantingById = async (id, { actifity, timeofday }) => {
  const sql = "UPDATE planting SET actifity = ?, timeofday = ? WHERE id = ?";
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [actifity, timeofday, id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });

    return result || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam updatePlantingById:", error);
  }
};

export {
  getPlantingByPlantId,
  getPlantingByPlantIdAndMethod,
  deletePlantingById,
  updatePlantingById,
};
