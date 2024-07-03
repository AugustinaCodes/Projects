import express from "express";
import petRouter from "./petRouter.js";
import medicationRouter from "./medicationRouter.js"
import logRouter from "./logRouter.js"


const router = express.Router();

router.use("/v1/pets", petRouter);
router.use("/v1/meds", medicationRouter);
router.use("/v1/logs", logRouter)

export default router;
