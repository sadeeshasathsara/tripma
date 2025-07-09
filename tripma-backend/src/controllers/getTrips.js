/**
 * Controller to fetch a paginated list of trips.
 * Applies sorting, pagination, population of nested fields, and DTO transformation.
 */

import Trip from "../models/Trip.js";
import Tag from "../models/Tag.js";
import Place from "../models/Place.js";
import UserFeedback from "../models/UserFeedback.js";
import User from "../models/User.js";
import { Queue } from "datastructures-js";
import TripDTO from "./DTOs/TripDTO.js";
import TagDTO from "./DTOs/TagDTO.js";
import ReviewDTO from "./DTOs/ReviewDTO.js";
import PlaceDTO from "./DTOs/PlaceDTO.js";

/**
 * GET /api/trips
 *
 * Query Parameters:
 * - lastFetched: (number) Optional offset for pagination. Defaults to 0.
 *
 * Response:
 * - 200 OK: JSON containing an array of transformed trip data.
 * - 500 Internal Server Error: JSON with error message.
 *
 * Populates:
 * - tags.tagId → Tag model
 * - places.placeId → Place model
 * - reviews.reviewId → Review model (with populated user info inside ReviewDTO)
 */
const GetTrips = async (req, res) => {
    try {
        // Parse query parameter for pagination offset
        let lastFetched = parseInt(req.query.lastFetched) || 0;

        // Queue to store TripDTOs
        const tripsQueue = new Queue();

        // Fetch and populate related fields from Trip model
        const filteredTrips = await Trip.find()
            .sort({ createdAt: -1 })
            .skip(lastFetched)
            .limit(20)
            .populate("tags.tagId")
            .populate("places.placeId")
            .populate("reviews.reviewId")
            .populate({
                path: "places.placeId",
                populate: {
                    path: "tags",
                    model: "Tag"
                }
            })
            .populate({
                path: "reviews.reviewId",
                populate: {
                    path: "userId",
                    model: "User"
                }
            })

        // Transform each Trip document into a DTO with nested entities
        filteredTrips.forEach((tripDoc) => {
            const dto = new TripDTO(tripDoc);

            // Attach tag DTOs
            tripDoc.tags.forEach((tag) => {
                dto.putTag(new TagDTO(tag.tagId));
            });

            // Attach place DTOs
            tripDoc.places.forEach((place) => {
                dto.putPlaces(new PlaceDTO(place.placeId));
            });

            // Attach review DTOs
            tripDoc.reviews.forEach((review) => {
                dto.putReviews(new ReviewDTO(review.reviewId));
            });

            // Enqueue the fully built DTO
            tripsQueue.enqueue(dto);
        });

        // Extract DTOs from queue into array for response
        const trips = [];
        while (!tripsQueue.isEmpty()) {
            trips.push(tripsQueue.dequeue());
        }

        // Send final transformed data
        return res.status(200).json({ message: trips });
    } catch (e) {
        // Handle server or DB errors
        return res.status(500).json({ message: e.message });
    }
};

export default GetTrips;
