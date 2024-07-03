import express from "express";
import { addLog, getLogsByPetId } from "../controllers/logControllers.js";

const router = express.Router();

router.get("/:augintinioId", getLogsByPetId);
router.post("/", addLog);

export default router;
