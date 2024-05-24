import Storie from "../models/Story.js";
import User from "../models/User.js";

/* CREATE */
export const createStory = async (req, res) => {
    try {
        const { userId, type, description, contentPath, expiresAt } = req.body;

        const newStorie = new Storie({ userId, type, description, contentPath, expiresAt });
        await newStorie.save();
        res.status(201).json(newStorie);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* READ */
export const getStoriesFromUser = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const user = await User.findById(id);
        const stories = await Storie.find({ _id: { $in: user.stories } })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(stories);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* DELETE */
export const deleteStorie = async (req, res) => {
    try {
        const { id } = req.params;
        await Storie.findByIdAndDelete(id);
        res.status(200).json({ message: "Storie deleted successfully" });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}