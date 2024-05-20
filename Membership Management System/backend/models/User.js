import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    membership: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Membership"
        }
    ]
})

export default mongoose.model("User", userSchema);