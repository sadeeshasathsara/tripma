/**
 * Data Transfer Object for formatting and transporting tag-related data.
 * Useful for returning simplified or shaped tag objects to clients or APIs.
 */
class TagDTO {
    _id = null;
    name = null;
    slug = null;
    type = null;

    /**
     * Constructs a TagDTO instance from a tag object or Mongoose document.
     *
     * @param {Object} tagDoc - Source tag object.
     * @param {string} [tagDoc._id] - MongoDB document ID.
     * @param {string} [tagDoc.name] - Display name of the tag.
     * @param {string} [tagDoc.slug] - URL-friendly version of the tag name.
     * @param {string} [tagDoc.type] - Tag category (e.g., 'location', 'theme', etc.).
     */
    constructor(tagDoc = {}) {
        this._id = tagDoc._id ?? null;
        this.name = tagDoc.name ?? null;
        this.slug = tagDoc.slug ?? null;
        this.type = tagDoc.type ?? null;
    }

    /**
     * Converts the TagDTO instance into a plain JSON-compatible object.
     *
     * @returns {Object} Formatted tag data.
     */
    json() {
        return {
            _id: this._id,
            name: this.name,
            slug: this.slug,
            type: this.type
        };
    }
}

export default TagDTO
