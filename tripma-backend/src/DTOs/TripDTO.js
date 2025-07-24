/**
 * Data Transfer Object for formatting and transporting trip-related data.
 * Designed to wrap and shape data returned from a Trip Mongoose model before
 * sending it to the client or API.
 */
class TripDTO {
    _id = null;
    name = null;
    description = null;
    duration = null;
    price = null;
    originalPrice = null;
    rating = null;
    tags = [];
    places = [];
    reviews = [];
    createdAt = null;

    /**
     * Constructs a TripDTO instance from a Mongoose Trip document or plain object.
     *
     * @param {Object} tripDoc - Source trip data.
     * @param {string} [tripDoc._id] - Trip ID (MongoDB document ID).
     * @param {string} [tripDoc.name] - Name of the trip.
     * @param {string} [tripDoc.description] - Trip description.
     * @param {number} [tripDoc.duration] - Duration of the trip.
     * @param {number} [tripDoc.price] - Discounted/current price.
     * @param {number} [tripDoc.originalPrice] - Original (non-discounted) price.
     * @param {number} [tripDoc.rating] - Average rating for the trip.
     */
    constructor(tripDoc = {}) {
        this._id = tripDoc._id ?? null;
        this.name = tripDoc.name ?? null;
        this.description = tripDoc.description ?? null;
        this.duration = tripDoc.duration ?? null;
        this.price = tripDoc.price ?? null;
        this.originalPrice = tripDoc.originalPrice ?? null;
        this.rating = tripDoc.rating.toFixed(1) ?? null;

        if (tripDoc.createdAt) {
            this.createdAt = tripDoc.createdAt;
        } else if (tripDoc._id && typeof tripDoc._id.getTimestamp === 'function') {
            this.createdAt = tripDoc._id.getTimestamp();
        } else {
            this.createdAt = null;
        }
    }

    /**
     * Appends a tag to the tags array.
     * @param {Object|string} tag - Tag object or string to associate with the trip.
     */
    putTag(tag = {}) {
        this.tags.push(tag);
    }

    /**
     * Appends a place to the places array.
     * @param {Object} place - Place object associated with the trip.
     */
    putPlaces(place = {}) {
        this.places.push(place);
    }

    /**
     * Appends a review to the reviews array.
     * @param {Object} review - Review object associated with the trip.
     */
    putReviews(review = {}) {
        this.reviews.push(review);
    }

    /**
     * Converts the TripDTO instance into a plain JSON-compatible object.
     *
     * @returns {Object} Formatted trip data.
     */
    json() {
        return {
            tripId: this._id,
            name: this.name,
            description: this.description,
            duration: this.duration,
            price: this.price,
            originalPrice: this.originalPrice,
            rating: this.rating,
            tags: this.tags,
            places: this.places,
            reviews: this.reviews
        };
    }
}

export default TripDTO