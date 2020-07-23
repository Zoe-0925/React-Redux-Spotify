
const { Map } = require('immutable');

const libraryReducer= new Map({
    "trackToToggle":["track1", "track2"],
    "albumToToggle":"album",
    "playlistToToggle":"playlist",
    "artistoToggle":"artist",
})

const state = {
    "LibraryReducer": libraryReducer
}

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

