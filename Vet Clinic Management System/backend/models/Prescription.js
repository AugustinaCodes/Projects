import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  medication_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medication",
    required: true,
  },
  pet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export default mongoose.model("prescription", prescriptionSchema);
