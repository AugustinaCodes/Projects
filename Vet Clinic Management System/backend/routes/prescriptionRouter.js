import express from "express";
import {
  addPrescription,
  getPrescriptionsByPetId,
} from "../controllers/prescriptionControllers.js";

const router = express.Router();

router.get("/:augintinioId", getPrescriptionsByPetId);
router.post("/", addPrescription);

export default router;
