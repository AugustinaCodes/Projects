import express from "express";
import { addBook, deleteBookById, getBookById, getBooks } from "../controllers/bookControllers.js";

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", addBook);

router.delete("/:id", deleteBookById);

export default router;