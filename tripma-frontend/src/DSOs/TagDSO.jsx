import React from 'react'

class TagDSO {
    _id = null;
    name = null;
    slug = null;
    type = null;

    constructor(tagObj = {}) {
        this._id = tagObj._id ?? null;
        this.name = tagObj.name ?? null;
        this.slug = tagObj.slug ?? null;
        this.type = tagObj.type ?? null;
    }

    json() {
        return {
            _id: this._id,
            name: this.name,
            slug: this.slug,
            type: this.type
        };
    }
}

export default TagDSO