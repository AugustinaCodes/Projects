import express from "express";
import membershipRouter from "./membershipRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use(membershipRouter);
router.use(userRouter);

export default router;