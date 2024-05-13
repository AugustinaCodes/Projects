import mongoose from "mongoose";

const todolistSchema = new mongoose.Schema({
    title: String,
    description: String
});

export default mongoose.model("todolist", todolistSchema);