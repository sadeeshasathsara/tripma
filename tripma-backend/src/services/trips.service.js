import Trip from "../models/Trip.js";
import Place from "../models/Place.js";
import Tag from "../models/Tag.js";
import UserFeedback from "../models/UserFeedback.js";
import User from "../models/User.js";
import { Queue } from "datastructures-js";
import TripDTO from "../DTOs/TripDTO.js";
import TagDTO from "../DTOs/TagDTO.js";
import ReviewDTO from "../DTOs/ReviewDTO.js";
import PlaceDTO from "../DTOs/PlaceDTO.js";

/**
 * Service to fetch trips from the database and transform them into DTOs.
 *
 * @param {Object} options              - Pagination and filtering options
 * @param {number} [options.skip=0]     - Number of records to skip
 * @param {number} [options.limit=20]   - Maximum number of records to return
 * @returns {Promise<TripDTO[]>}        - Array of TripDTO objects
 * @throws {Error}                      - Throws if database query fails
 */
export async function fetchTrips({ skip = 0, limit = 20 } = {}) {
    // Fetch raw trip documents from MongoDB
    const tripDocs = await Trip.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        // Populate top-level tags
        .populate("tags.tagId")
        // Populate places and nested place tags
        .populate("places.placeId")
        .populate({
            path: "places.placeId",
            populate: { path: "tags", model: "Tag" }
        })
        // Populate reviews and nested user details
        .populate("reviews.reviewId")
        .populate({
            path: "reviews.reviewId",
            populate: { path: "userId", model: "User" }
        });

    // Use a queue to preserve insertion order while assembling DTOs
    const dtoQueue = new Queue();

    tripDocs.forEach(doc => {
        const dto = new TripDTO(doc);

        // Attach each tag as a TagDTO
        doc.tags.forEach(tagRel => dto.putTag(new TagDTO(tagRel.tagId)));

        // Attach each place as a PlaceDTO
        doc.places.forEach(placeRel => dto.putPlaces(new PlaceDTO(placeRel.placeId)));

        // Attach each review as a ReviewDTO
        doc.reviews.forEach(reviewRel => dto.putReviews(new ReviewDTO(reviewRel.reviewId)));

        dtoQueue.enqueue(dto);
    });

    // Drain the queue into an array
    const trips = [];
    while (!dtoQueue.isEmpty()) {
        trips.push(dtoQueue.dequeue());
    }

    return trips;
}
