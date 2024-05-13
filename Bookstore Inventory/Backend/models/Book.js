import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    price: Number,
    quantity: Number
})

export default mongoose.model("book", bookSchema);