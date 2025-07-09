import React from 'react'

class TripDSO {
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

    constructor(tripObj = {}) {
        this._id = tripObj._id ?? null;
        this.name = tripObj.name ?? null;
        this.description = tripObj.description ?? null;
        this.duration = tripObj.duration ?? null;
        this.price = tripObj.price ?? null;
        this.originalPrice = tripObj.originalPrice ?? null;
        this.rating = tripObj.rating ?? null;
    }

    putTag(tag = {}) {
        this.tags.push(tag);
    }

    putPlaces(place = {}) {
        this.places.push(place);
    }

    putReviews(review = {}) {
        this.reviews.push(review);
    }

    json() {
        return {
            _id: this._id,
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

export default TripDSO