import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  client_email: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("Pet", petSchema);
