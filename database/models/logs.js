import connection from "../config/database.js";

const create = async (plan_id, succes, fail) => {
    const sql = "INSERT INTO logs (plan_id, succes, fail) VALUES (?, ?, ?)";
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, [plan_id, succes, fail], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        return result;
    } catch (error) {
        console.error("Terjadi kesalahan dalam createLogs:", error);
    }
};

const update = async (id, succes, fail) => {
    const sql = "UPDATE logs SET succes = ?, fail = ? WHERE id = ?";
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, [succes, fail, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        return result;
    } catch (error) {
        console.error("Terjadi kesalahan dalam updateLogs:", error);
    }
};

const deleteLogModel = async (id) => {
    const sql = "DELETE FROM logs WHERE id = ?";
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        return result;
    } catch (error) {
        console.error("Terjadi kesalahan dalam deleteLogs:", error);
    }
};

const getLogByPlanId = async (plan_id) => {
    const sql = "SELECT * FROM logs WHERE plan_id = ?";
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, [plan_id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        return result || null;
    } catch (error) {
        console.error("Terjadi kesalahan dalam getLogByPlanId:", error);
    }
};

const getLogByUserId = async (user_id) => {
    const sql = "SELECT logs.*, plan.id_pemilik, plan.id_plant, plan.count, plan.started_at, plant.name FROM logs JOIN plan ON logs.plan_id = plan.id_plan JOIN plant ON plan.id_plant = plant.id WHERE plan.id_pemilik = ?";
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, [user_id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        return result || null;
    } catch (error) {
        console.error("Terjadi kesalahan dalam getLogByPlanId:", error);
    }
};

const deleteLogsByPlanId = async (plan_id) => {
    const sql = "DELETE FROM logs WHERE plan_id = ?";
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, [plan_id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });

        return result;
    } catch (error) {
        console.error("Terjadi kesalahan dalam deleteLogsByPlanId:", error);
    }
};

export { create, update, deleteLogModel, deleteLogsByPlanId, getLogByPlanId, getLogByUserId };
