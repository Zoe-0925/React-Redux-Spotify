import {
    getAlbums, findAlbumById, getCurrentArtistsAlbums, getCurrentAlbumId,
    getTracksInAlbum
} from "../Selectors"

const { Map } = require('immutable');



const album1 = new Map({
    "albumId": "1",
    "albumName": "album1",
    "trackIds": ["3", "4"]
})
const album2 = new Map({
    "albumId": "2",
    "albumName": "album2",
})
const albumReducer = new Map({
    "albums": [album1, album2],
    "currentArtistAlbums": [album1],
    "currentAlbumId": "1"
})
const state = {
    "AlbumReducer": albumReducer
}

describe('getAlbums', () => {
    it('should return the tracks', () => {
        let selector = getAlbums(state)
        expect(selector).toEqual([album1, album2]);
    })
})

describe('findAlbumById', () => {
    it('should return the tracks', () => {
        let selector = findAlbumById(albumReducer, "1")
        expect(selector).toEqual(album1);
    })
})

describe('getCurrentArtistsAlbums', () => {
    it('should return the tracks', () => {
        let selector = getCurrentArtistsAlbums(albumReducer)
        expect(selector).toEqual([album1]);
    })
})

describe('getCurrentAlbumId', () => {
    it('should return the current album id', () => {
        let selector = getCurrentAlbumId(state)
        expect(selector).toBe("1");
    })
})

describe('getTracksInAlbum', () => {
    it('should return the track ids if found in the album', () => {
        let selector = getTracksInAlbum(state, "1")
        expect(selector).toBe(["3", "4"]);
    })

    it('should return an empty array if not found', () => {
        let selector = getTracksInAlbum(state, "2")
        expect(selector).toBe([]);
    })
})
