import { findArtistById, getCurrentArtistId, getArtistSaved } from "../Selectors"
const { Map } = require('immutable');

const artist1 = new Map({
    "artistId": "1",
    "name": "artist1"
})
const artist2 = new Map({
    "artistId": "2",
    "name": "artist2"
})
const artistReducer = new Map({
    "currentArtistId": "1",
    "currentArtistSaved": "albums"
})
const state = {
    "artists": [artist1, artist2],
    ArtistReducer: artistReducer
}

describe('findArtistById', () => {
    it('should return the tracks', () => {
        let selector = findArtistById(state, "1")
        expect(selector).toEqual(artist1);
    })
})

describe('getCurrentArtistId', () => {
    it('should return the tracks', () => {
        let selector = getCurrentArtistId(state)
        expect(selector).toBe("1");
    })
})

describe('getArtistSaved', () => {
    it('should return the tracks', () => {
        let selector = getArtistSaved(state)
        expect(selector).toBe("albums");
    })
})
