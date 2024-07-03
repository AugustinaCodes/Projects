import express from "express";
import {
  addPet,
  deletePetById,
  getPets,
} from "../controllers/petControllers.js";

const router = express.Router();

router.get("/", getPets);
router.post("/", addPet);
router.delete("/:id", deletePetById);

export default router;
