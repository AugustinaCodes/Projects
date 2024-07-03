import Pet from "../models/Pet.js";

export async function addPet(req, res) {
  const { name, dob, client_email } = req.body;

  if (!name || !dob || !client_email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPet = new Pet({
      name,
      dob,
      client_email,
      archived: false,
    });
    await newPet.save();

    res.status(201).json(newPet);
  } catch (error) {
    console.log("Error saving new pet", error);
    res.status(500).json({ error: "Error occured while adding pet" });
  }
}

export async function getPets(req, res) {
  try {
    const pets = await Pet.find({ archived: false });
    res.status(200).json(pets);
  } catch (error) {
    console.log("Error fetching pets", error);
    res.status(500).json({ error: "Error occured while fetching pets" });
  }
}

export async function deletePetById(req, res) {
  const { id } = req.params;

  try {
    const pet = await Pet.findByIdAndUpdate(id, { archived: true }, { new: true });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.log("Error deleting pet", error);
    res.status(500).json({ error: "Error occured while deleting pet" });
  }
}
