import express from "express";
import connection from "./database/config/database.js";
import runMigrations from "./database/init/runMigrations.js";
import runSeeders from "./database/init/runSeeders.js";
import { login } from "./controller/auth/login.js";
import { register } from "./controller/auth/register.js";
import { verify } from "./controller/auth/verify.js";
import { plant } from "./controller/farm/plant.js";
import { plan, getPlanById, getAllPlanByUserid, deletePlantingActivity, updatePlantingActivity, deletePlan } from "./controller/farm/plan.js";
import { home } from "./controller/home/index.js";
import { showLog, createLog, updateLog, deleteLog } from "./controller/catatan_riwayat/logs.js";
import { calculate } from "./controller/catatan_riwayat/calculate.js";
import verifyToken from "./middleware/auth.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}

app.use(cors(corsOptions));

app.use(express.json());

app.post("/login", login);
app.post("/register", register);
app.post("/verify", verify);

app.get("/plant", plant);
app.post("/plan", plan);
app.get("/plan/:id", getPlanById);
app.post("/planOnly/:id", getAllPlanByUserid);
app.delete("/planting/:id", deletePlantingActivity);
app.put("/planting/:id", updatePlantingActivity);
app.delete("/plan/:id", deletePlan);

app.get("/", verifyToken, home);

app.get("/log/:id", showLog);
app.post("/log/create", createLog);
app.put("/log/update/:id", updateLog);
app.delete("/log/user/:user_id/delete/:id", deleteLog);

app.get("/log/calculate/:id", calculate);
const start = async () => {
  try {
    await runMigrations(connection);
    await runSeeders(connection);
    console.log("Migrasi & seeder siap.");
  } catch (error) {
    console.error("Gagal menjalankan migrasi/seeder otomatis:", error);
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

start();
