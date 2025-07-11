/**
 * Data Transfer Object for formatting and transporting place-related data.
 * Intended to be used when shaping data returned from a Mongoose Place model
 * before sending it to the frontend or an external API.
 */
class PlaceDTO {
    _id = null;
    name = null;
    bio = null;
    city = null;
    country = null;
    nearestAirport = null;
    thumbnail = null;
    cover = null;
    gallery = [];
    tags = [];
    createdAt = null;

    /**
     * Creates an instance of PlaceDTO from a Mongoose document or plain object.
     *
     * @param {Object} placeDoc - The source object containing place data.
     * @param {string} [placeDoc._id] - MongoDB document ID.
     * @param {string} [placeDoc.name] - Name of the place.
     * @param {string} [placeDoc.bio] - Short description or bio.
     * @param {string} [placeDoc.city] - City where the place is located.
     * @param {string} [placeDoc.country] - Country where the place is located.
     * @param {string} [placeDoc.nearestAirport] - Nearest airport to the place.
     * @param {string} [placeDoc.thumbnail] - Thumbnail image URL.
     * @param {string} [placeDoc.cover] - Cover image URL.
     * @param {Array} [placeDoc.gallery] - Image gallery array.
     */
    constructor(placeDoc = {}) {
        this._id = placeDoc._id ?? null;
        this.name = placeDoc.name ?? null;
        this.bio = placeDoc.bio ?? null;
        this.city = placeDoc.city ?? null;
        this.country = placeDoc.country ?? null;
        this.nearestAirport = placeDoc.nearestAirport ?? null;
        this.thumbnail = placeDoc.thumbnail ?? null;
        this.cover = placeDoc.cover ?? null;
        this.gallery = placeDoc.gallery ?? [];
        placeDoc.tags.map((tag) => {
            this.putTag(tag)
        })

        if (placeDoc.createdAt) {
            this.createdAt = placeDoc.createdAt;
        } else if (placeDoc._id && typeof placeDoc._id.getTimestamp === 'function') {
            this.createdAt = placeDoc._id.getTimestamp();
        } else {
            this.createdAt = null;
        }
    }

    /**
     * Appends a tag to the tags array.
     *
     * @param {Object|string} tag - A tag object or string to associate with the place.
     */
    putTag(tag = {}) {
        this.tags.push(tag);
    }

    /**
     * Converts the PlaceDTO instance into a plain JSON-compatible object.
     *
     * @returns {Object} Formatted place data.
     */
    json() {
        return {
            _id: this._id,
            name: this.name,
            bio: this.bio,
            city: this.city,
            country: this.country,
            nearestAirport: this.nearestAirport,
            thumbnail: this.thumbnail,
            cover: this.cover,
            gallery: this.gallery,
            tags: this.tags
        };
    }
}

export default PlaceDTO