import {
    getToken, findArtistById, getCurrentArtistId, getArtistSaved,
    getAlbums, findAlbumById, getCurrentArtistsAlbums, getCurrentAlbumId,
    getTracksInAlbum
} from "../Selectors"

const { Map } = require('immutable');

const artist1 = new Map({
    "artistId": "1",
    "name": "artist1"
})
const artist2 = new Map({
    "artistId": "2",
    "name": "artist2"
})
const state = {
    UserReducer: {
        accessToken: "token"
    },
    libraryReducer: new Map({
        "trackToToggle": ["track1", "track2"],
        "albumToToggle": "album",
        "playlistToToggle": "playlist",
        "artistoToggle": "artist",
    }),
    artistReducer: new Map({
        "artists": [artist1, artist2],
        "currentArtistId": "1",
    })
}






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



describe('getToken', () => {
    it('should return the access token', () => {
        let action = getToken(UserReducer);
        expect(action).toBe("token");
    })
})

describe('getTrackToToggle', () => {
    it('should return the tracks', () => {
        let selector = getTrackToToggle(state)
        expect(selector).toEqual(["track1", "track2"]);
    })
})

describe('getArtistToToggle', () => {
    it('should return the artist', () => {
        let selector = getArtistToToggle(state)
        expect(selector).toBe("artist");
    })
})

describe('getAlbumToToggle', () => {
    it('should return the albums', () => {
        let selector = getAlbumToToggle(state)
        expect(selector).toBe("album");
    })
})

describe('getPlaylistToToggle', () => {
    it('should return the albums', () => {
        let selector = getPlaylistToToggle(state)
        expect(selector).toBe("playlist");
    })
})

