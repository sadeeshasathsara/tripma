import TagDTO from "./DTOs/TagDTO.js";
import Tag from "../models/Tag.js";

async function GetTags(req, res) {
    try {
        const tags = await Tag.find();
        const queue = tags.map(tag => new TagDTO(tag));

        return res.status(200).json({ message: queue });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

export default GetTags;
