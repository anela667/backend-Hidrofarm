import connection from "../config/database.js";

const createPlan = async (id_pemilik, id_plant, method, area, count) => {
  const sql =
    "INSERT INTO plan (id_pemilik, id_plant, method, area, count) VALUES (?, ?, ?, ?, ?)";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [id_pemilik, id_plant, method, area, count],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    return result;
  } catch (error) {
    console.error("Terjadi kesalahan dalam createPlan:", error);
  }
};

const getPlanByUserIdPlanIdDate = async (
  id_pemilik,
  id_plant,
  started_at
) => {
  const sql =
    "SELECT * FROM plan WHERE id_pemilik = ? AND id_plant = ? AND started_at = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [id_pemilik, id_plant, started_at],
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });

    return result[0] || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getPlanByUserIdPlanIdDate:", error);
  }
};

const getPlanByUserId = async (id_pemilik) => {
  const sql = "SELECT * FROM plan WHERE id_pemilik = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id_pemilik], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getPlanByUserId:", error);
  }
};

const getPlanById = async (id_plan) => {
  const sql = "SELECT * FROM plan WHERE id_plan = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id_plan], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result[0] || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getPlanById:", error);
  }
};

const getPlanOnlyByIdUser = async (id_pemilik) => {
  const sql = "SELECT * FROM plan WHERE id_pemilik = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id_pemilik], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result || null;
  } catch (error) {
    console.error("Terjadi kesalahan dalam getPlanOnlyByIdUser:", error);
  }
};

const deletePlanById = async (id_plan) => {
  const sql = "DELETE FROM plan WHERE id_plan = ?";

  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(sql, [id_plan], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    return result;
  } catch (error) {
    console.error("Terjadi kesalahan dalam deletePlanById:", error);
  }
};

export {
  createPlan,
  getPlanByUserIdPlanIdDate,
  getPlanByUserId,
  getPlanById,
  getPlanOnlyByIdUser,
  deletePlanById,
};
