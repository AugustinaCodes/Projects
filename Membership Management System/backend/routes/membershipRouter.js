import express from "express";
import { addNewMembership, deleteMembershipById, getMemberships } from "../controllers/membershipController.js";

const router = express.Router();

router.get("/membership", getMemberships);

router.post("/membership", addNewMembership);

router.delete("/membership/:id", deleteMembershipById);

export default router;