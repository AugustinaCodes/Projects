import express from "express";
import {
  addMedication,
  getMedications,
} from "../controllers/medicationControllers.js";

const router = express.Router();

router.get("/", getMedications);
router.post("/", addMedication);

export default router;
