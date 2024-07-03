import Medication from "../models/Medication.js";

export async function addMedication(req, res) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMedication = new Medication({
      name,
      description,
    });
    await newMedication.save();

    res.status(201).json(newMedication);
  } catch (error) {
    console.log("Error saving new medication", error);
    res.status(500).json({ error: "Error occured while adding medication" });
  }
}

export async function getMedications(req, res) {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    console.log("Error fetching medications", error);
    res.status(500).json({ error: "Error occured while fetching medications" });
  }
}
