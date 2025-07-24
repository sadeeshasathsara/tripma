class ReviewDSO {
    userName = null;
    country = null;
    feedback = null;
    stars = null;

    constructor(reviewObj = {}) {
        this.userName = reviewObj.userName
        this.country = reviewObj.country
        this.feedback = reviewObj.feedback
        this.stars = reviewObj.stars
    }

    json() {
        return {
            userName: this.userName,
            country: this.country,
            feedback: this.feedback,
            stars: this.stars
        };
    }
}