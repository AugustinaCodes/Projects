import Membership from "../models/Membership.js";

export async function addNewMembership(req, res) {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        res.status(400).json({ message: "Info missing in body" })
        return;
    }

    const newMembership = new Membership({
        name,
        price,
        description
    })

    try {
        await newMembership.save();
        res.status(201).json(newMembership)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getMemberships(req, res) {
    try {
        const memberships = await Membership.find({});
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function deleteMembershipById(req, res) {
    const { id } = req.params;

    try {
        const response = await Membership.findByIdAndDelete(id);
        if(!response) {
            res.status(404).json({ message: "Membership not found" });
            return;
        }

        res.json({ message: "success" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}