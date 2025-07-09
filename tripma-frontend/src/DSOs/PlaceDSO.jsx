class PlaceDSO {
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

    constructor(placeObj = {}) {
        this._id = placeObj._id ?? null;
        this.name = placeObj.name ?? null;
        this.bio = placeObj.bio ?? null;
        this.city = placeObj.city ?? null;
        this.country = placeObj.country ?? null;
        this.nearestAirport = placeObj.nearestAirport ?? null;
        this.thumbnail = placeObj.thumbnail ?? null;
        this.cover = placeObj.cover ?? null;
        this.gallery = placeObj.gallery ?? [];
        this.tags = placeObj.tags ?? [];
    }

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