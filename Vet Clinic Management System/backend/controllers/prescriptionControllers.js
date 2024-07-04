import Prescription from "../models/Prescription.js";
import Pet from "../models/Pet.js";
import Medication from "../models/Medication.js";

export async function addPrescription(req, res) {
  const { medication_id, pet_id, comment } = req.body;

  if (!medication_id || !pet_id || !comment) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const petExists = await Pet.findById(pet_id);
    if (!petExists) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const medicationExists = await Medication.findById(medication_id);
    if (!medicationExists) {
      return res.status(404).json({ error: "Medication not found" });
    }

    const newPrescription = new Prescription({
      medication_id,
      pet_id,
      comment,
    });

    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    console.log("Error saving prescription", error);
    res.status(500).json({ error: "Error occurred while adding prescription" });
  }
}

export async function getPrescriptionsByPetId(req, res) {
  const { augintinioId } = req.params;

  try {
    const prescriptions = await Prescription.find({
      pet_id: augintinioId,
    })
    res.status(200).json(prescriptions);
  } catch (error) {
    console.log("Error fetching prescriptions", error);
    res
      .status(500)
      .json({ error: "Error occurred while fetching prescriptions" });
  }
}
