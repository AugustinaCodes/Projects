import express from "express";
import petRouter from "./petRouter.js";
import medicationRouter from "./medicationRouter.js"
import logRouter from "./logRouter.js"
import prescriptionRouter from "./prescriptionRouter.js"


const router = express.Router();

router.use("/v1/pets", petRouter);
router.use("/v1/meds", medicationRouter);
router.use("/v1/logs", logRouter)
router.use("/v1/prescriptions", prescriptionRouter)

export default router;
