import {
    loadLibraryPage, saveToSavedAlbums, saveToSavedArtists, saveToSavedPlaylists, saveToSavedTracks, loadNextTracks
    , toggleTrack, toggleArtist, toggleAlbum, togglePlaylist, LOAD_LIBRARY_PAGE, SAVE_TO_SAVED_ALBUMS,
    SAVE_TO_SAVED_ALBUMS, SAVE_TO_SAVED_PLAYLISTS, SAVE_TO_SAVED_TRACKS, LOAD_NEXT_TRACKS, TOGGLE_TRACK
    , TOGGLE_ARTIST, TOGGLE_ALBUM, TOGGLE_PLAYLIST
} from "../Actions"

describe('loadLibraryPage', () => {
    it('should create an action', () => {
        let action = loadLibraryPage();
        expect(action).toEqual({
            type: LOAD_LIBRARY_PAGE,
        });
    })
})

describe('saveToSavedAlbums', () => {
    it('should create an action', () => {
        const albums = ["album1", "album2", "album3"]
        let action = saveToSavedAlbums(albums);
        expect(action).toEqual({
            type: SAVE_TO_SAVED_ALBUMS,
            albumIds: albums,
        });
    })
})

describe('saveToSavedArtists', () => {
    it('should create an action', () => {
        const albums = ["album1", "album2", "album3"]
        let action = saveToSavedArtists(albums);
        expect(action).toEqual({
            type: SAVE_TO_SAVED_ARTISTS,
            artistIds: artists,
        });
    })
})

describe('saveToSavedPlaylists', () => {
    it('should create an action', () => {
        const albumIds = ["album1", "album2", "album3"]
        let action = saveToSavedPlaylists(albumIds);
        expect(action).toEqual({
            type: SAVE_TO_SAVED_PLAYLISTS,
            albumIds: albumIds,
        });
    })
})

describe('saveToSavedTracks', () => {
    it('should create an action', () => {
        const tracks = ["track1", "track2", "track3"]
        let action = saveToSavedTracks(tracks);
        expect(action).toEqual({
            type: SAVE_TO_SAVED_TRACKS,
            tracks: tracks,
        });
    })
})

describe('loadNextTracks', () => {
    it('should create an action', () => {
        const tracks = ["track1", "track2", "track3"]
        let action = loadNextTracks(tracks);
        expect(action).toEqual({
            type: LOAD_NEXT_TRACKS,
            tracks: tracks,
        });
    })
})

describe('toggleTrack', () => {
    it('should create an action', () => {
        const data = "trackid"
        let action = toggleTrack(data);
        expect(action).toEqual({
            type: TOGGLE_TRACK,
            data: data,
        });
    })
})

describe('toggleArtist', () => {
    it('should create an action', () => {
        const data = "artistid"
        let action = toggleArtist(data);
        expect(action).toEqual({
            type: TOGGLE_ARTIST,
            data: data,
        });
    })
})

describe('toggleAlbum ', () => {
    it('should create an action', () => {
        const data = "albumid"
        let action = toggleAlbum(data);
        expect(action).toEqual({
            type: TOGGLE_ALBUM,
            data: data,
        });
    })
})

describe('togglePlaylist ', () => {
    it('should create an action', () => {
        const data = "playlistid"
        let action = togglePlaylist(data);
        expect(action).toEqual({
            type: TOGGLE_PLAYLIST,
            data: data,
        });
    })
})
