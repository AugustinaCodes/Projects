import express from "express";
import petRouter from "./petRouter.js"

const router = express.Router();

router.use("/v1/pets", petRouter);


export default router;