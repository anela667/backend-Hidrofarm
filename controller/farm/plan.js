import {
  createPlan,
  getPlanByUserIdPlantMethodDate,
  getPlanByUserId,
  getPlanOnlyByIdUser,
  deletePlanById,
} from "../../database/models/plan.js";
import { getPlantsByPlantId } from "../../database/models/plant.js";
import {
  getPlantingByPlantIdAndMethod,
  deletePlantingById,
  updatePlantingById,
} from "../../database/models/planting.js";
import { deleteLogsByPlanId } from "../../database/models/logs.js";

const SUPPORTED_METHODS = ["NFT", "Wick System"];

const PLANT_DENSITY_PER_M2 = {
  NFT: 25,
  "Wick System": 16,
};

const estimateCount = (method, area) => {
  const density = PLANT_DENSITY_PER_M2[method] ?? PLANT_DENSITY_PER_M2["Wick System"];
  const estimated = Math.round(Number(area) * density);
  return Math.max(estimated, 1);
};

const METHOD_RECOMMENDATION = {
  Sawi: {
    recommended: ["NFT", "Wick System"],
    reason:
      "Sawi adalah sayuran daun yang ringan dengan akar dangkal dan kebutuhan nutrisi rendah, jadi cocok dengan kedua metode.",
  },
  Selada: {
    recommended: ["NFT", "Wick System"],
    reason:
      "Selada adalah sayuran daun yang ringan dengan akar dangkal dan kebutuhan nutrisi rendah, jadi cocok dengan kedua metode.",
  },
  "Tomat Ceri": {
    recommended: ["NFT"],
    reason:
      "Tomat ceri adalah tanaman buah yang berat dan butuh nutrisi/air dalam jumlah besar saat berbuah. Wick System (sistem sumbu pasif) berisiko kurang optimal mengalirkan nutrisi saat tanaman sudah besar dan berbuah lebat.",
  },
};

const getMethodWarning = (plantName, method) => {
  const info = METHOD_RECOMMENDATION[plantName];
  if (!info || info.recommended.includes(method)) return null;

  return `For ${plantName}, the recommended method is ${info.recommended.join(
    " or "
  )}. ${info.reason} You can still continue with ${method}, but results may not be optimal.`;
};

const buildPlanData = async (plans) => {
  const data = [];

  for (const element of plans) {
    const plant = await getPlantsByPlantId(element.id_plant);
    if (!plant) continue; 
    const planting = await getPlantingByPlantIdAndMethod(
      element.id_plant,
      element.method
    );

    data.push({
      id: element.id_plan,
      count: element.count,
      area: element.area,
      method: element.method,
      started_at: element.started_at,
      plant: {
        id: plant.id,
        name: plant.name,
      },
      planting: planting || [],
    });
  }

  return data;
};

const plan = async (req, res) => {
  const { id_pemilik, id_plant, method, area } = req.body;
  const started_at = new Date().toISOString().split("T")[0];

  if (!id_pemilik || !id_plant || !method || !area) {
    return res.status(400).json({
      status: "error",
      message: "Failed to create plan! Plant, method, and land area are required.",
      data: null,
    });
  }

  if (!SUPPORTED_METHODS.includes(method)) {
    return res.status(400).json({
      status: "error",
      message: `Unsupported hydroponic method. Choose one of: ${SUPPORTED_METHODS.join(", ")}.`,
      data: null,
    });
  }

  if (Number(area) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Land area must be greater than 0.",
      data: null,
    });
  }

  const alreadyFarmForToday = await getPlanByUserIdPlantMethodDate(
    id_pemilik,
    id_plant,
    method,
    started_at
  );

  if (alreadyFarmForToday != null) {
    return res.status(400).json({
      status: "error",
      message: "You have already made a plan for this plant using this method today!",
      data: null,
    });
  }

  const count = estimateCount(method, area);
  const createdPlan = await createPlan(id_pemilik, id_plant, method, area, count);

  if (createdPlan && createdPlan.affectedRows > 0) {
    const plans = await getPlanByUserId(id_pemilik);
    const data = await buildPlanData(plans);
    const plant = await getPlantsByPlantId(id_plant);
    const warning = getMethodWarning(plant?.name, method);

    return res.status(200).json({
      status: "success",
      message: "Plan created successfully!",
      warning,
      data,
    });
  }

  return res.status(400).json({
    status: "error",
    message: "Failed to create plan!",
    data: null,
  });
};

const getPlanById = async (req, res) => {
  const id_pemilik = parseInt(req.params.id);

  if (isNaN(id_pemilik)) {
    return res.status(400).json({
      status: "error",
      message: "ID must be a number",
      data: null,
    });
  }

  const plans = await getPlanByUserId(id_pemilik);

  if (!plans) {
    return res.status(400).json({
      status: "error",
      message: "You don't have any plan yet!",
      data: null,
    });
  }

  const data = await buildPlanData(plans);

  return res.status(200).json({
    status: "success",
    message: "Get plan success!",
    data,
  });
};

const deletePlantingActivity = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "ID must be a number",
      data: null,
    });
  }

  const result = await deletePlantingById(id);

  if (!result || result.affectedRows === 0) {
    return res.status(400).json({
      status: "error",
      message: "Failed to delete activity, data not found.",
      data: null,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Activity deleted successfully!",
    data: null,
  });
};

// Edit 1 baris jadwal kegiatan harian (dipakai di kalender, menggantikan
// fitur hapus). Sama seperti hapus, karena baris planting dipakai bareng
// oleh plan lain dengan tanaman + metode yang sama, perubahan di sini
// akan berlaku untuk semua plan yang memakai kombinasi itu.
const updatePlantingActivity = async (req, res) => {
  const id = parseInt(req.params.id);
  const { actifity, timeofday } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "ID must be a number",
      data: null,
    });
  }

  if (!actifity || !timeofday) {
    return res.status(400).json({
      status: "error",
      message: "Activity description and time of day are required.",
      data: null,
    });
  }

  const result = await updatePlantingById(id, { actifity, timeofday });

  if (!result || result.affectedRows === 0) {
    return res.status(400).json({
      status: "error",
      message: "Failed to update activity, data not found.",
      data: null,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Activity updated successfully!",
    data: null,
  });
};

const getAllPlanByUserid = async (req, res) => {
  const id_pemilik = parseInt(req.params.id);

  const planByUserId = await getPlanOnlyByIdUser(id_pemilik);

  return res.status(200).json({
    status: "success",
    message: "Get plan success!",
    data: planByUserId,
  });
};

// Hapus 1 rencana tanam (beserta riwayat/logs yang nempel di rencana itu,
// supaya gak kena error foreign key -- logs.plan_id merujuk ke plan.id_plan).
const deletePlan = async (req, res) => {
  const id_plan = parseInt(req.params.id);

  if (isNaN(id_plan)) {
    return res.status(400).json({
      status: "error",
      message: "ID must be a number",
      data: null,
    });
  }

  await deleteLogsByPlanId(id_plan);
  const result = await deletePlanById(id_plan);

  if (!result || result.affectedRows === 0) {
    return res.status(400).json({
      status: "error",
      message: "Failed to delete plan, data not found.",
      data: null,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Plan deleted successfully!",
    data: null,
  });
};

export {
  plan,
  getPlanById,
  getAllPlanByUserid,
  deletePlantingActivity,
  updatePlantingActivity,
  deletePlan,
};
