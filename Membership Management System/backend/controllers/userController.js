import User from "../models/User.js";
import Membership from "../models/Membership.js";

export async function addNewUser(req, res) {
    const { name, surname, email } = req.body;

    if (!name || ! surname || !email) {
        res.status(400).json({ message: "Info missing in body" })
        return;
    }

    const newUser = new User({
        name,
        surname,
        email
    })

    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// export async function addMembershipToUser(req, res) {
//     const { userId, membershipId } = req.params;

//     const user = await User.findById(userId);
//     const membership = await Membership.findById(membershipId);

//     user.membership.push(membership);

//     await user.save();

//     res.json(user);
// }

// export async function getUsersWithMemberships(req, res) {
//     const users = await User.find().populate("membership");

//     res.json(users);
// }

export async function getUsersWithMembershipsSorted(req, res) {
    const { order } = req.params;
    const sortOrder = order === 'asc' ? 1 : order === 'desc' ? -1 : 1;

    try {
        const users = await User.find().populate("membership").sort({ name: sortOrder });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}