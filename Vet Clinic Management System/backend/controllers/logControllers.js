import Log from "../models/Log.js";
import Pet from "../models/Pet.js";

export async function addLog(req, res) {
  const { pet_id, description, status } = req.body;

  if (!pet_id || !description || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const petExists = await Pet.findById(pet_id);
    if (!petExists) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const newLog = new Log({
      pet_id,
      description,
      status,
    });

    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    console.log("Error saving log entry", error);
    res.status(500).json({ error: "Error occurred while adding log entry" });
  }
}

export async function getLogsByPetId(req, res) {
  const { augintinioId } = req.params;

  try {
    const logs = await Log.find({ pet_id: augintinioId });
    res.status(200).json(logs);
  } catch (error) {
    console.log("Error fetching logs", error);
    res.status(500).json({ error: "Error occurred while fetching logs" });
  }
}
