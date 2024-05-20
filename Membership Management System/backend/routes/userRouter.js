import express from "express";
import { addNewUser, getUsersWithMembershipsSorted } from "../controllers/userController.js";

const router = express.Router();

router.post("/user", addNewUser);

router.get("/user/:order", getUsersWithMembershipsSorted);

// router.get("/user/membership", getUsersWithMemberships);

// router.put("/user/:userId/membership/:membershipId", addMembershipToUser);

export default router;