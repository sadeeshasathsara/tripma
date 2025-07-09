/**
 * Data Transfer Object for formatting and transporting user review data.
 * Designed to work with a Mongoose `UserFeedback` document with a populated `userId`.
 */
class ReviewDTO {
    userName = null;
    country = null;
    feedback = null;
    stars = null;

    /**
     * Creates an instance of ReviewDTO using a UserFeedback document.
     *
     * @param {Object} feedbackDoc - The UserFeedback Mongoose document (with populated userId).
     * @param {Object} feedbackDoc.userId - Populated User document reference.
     * @param {string} [feedbackDoc.feedback] - The review text left by the user.
     * @param {number} [feedbackDoc.stars] - Star rating given by the user (e.g. 1–5).
     */
    constructor(feedbackDoc = {}) {
        const user = feedbackDoc.userId ?? {};

        const firstName = user.firstName ?? '';
        const lastName = user.lastName ?? '';
        this.userName = `${firstName} ${lastName}`.trim() || null;

        this.country = user.address?.country ?? null;
        this.feedback = feedbackDoc.feedback ?? null;
        this.stars = feedbackDoc.stars ?? null;
    }

    /**
     * Converts the ReviewDTO instance into a plain JSON-compatible object.
     *
     * @returns {Object} Formatted review data.
     */
    json() {
        return {
            userName: this.userName,
            country: this.country,
            feedback: this.feedback,
            stars: this.stars
        };
    }
}

export default ReviewDTO