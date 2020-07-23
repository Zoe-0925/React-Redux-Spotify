import {
    saveArtists, fetchArtistsAlbumsLoading, fetchArtistsAlbumsSuccessful,
   saveRelatedArtists, updateCurrentArtistSaved, fetchToggleArtistSaved,
    SAVE_ARTISTS, FETCH_ARTISTS_ALBUMS_LOADING, FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
 SAVE_RELATED_ARTISTS, UPDATE_CURRENT_ARTIST_SAVED, FETCH_TOGGLE_ARTIST_SAVED

} from "../Actions"

describe('saveArtists ', () => {
    it('should create an action', () => {
        const artists = ["artist1", "artist2"]
        let action = saveArtists(artists);
        expect(action).toEqual({
            type: SAVE_ARTISTS,
            artists: artists
        });
    })
})

describe('fetchArtistsAlbumsLoading', () => {
    it('should create an action', () => {
        const artistId = "artistId"
        let action = fetchArtistsAlbumsLoading(artistId);
        expect(action).toEqual({
            type: FETCH_ARTISTS_ALBUMS_LOADING,
            artistId: artistId
        });
    })
})

describe('fetchArtistsAlbumsSuccessful', () => {
    it('should create an action', () => {
        const data = ["data"]
        let action = fetchArtistsAlbumsSuccessful(data);
        expect(action).toEqual({
            type: FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
            data: data
        });
    })
})

describe('saveRelatedArtists', () => {
    it('should create an action', () => {
        const artists = ["artist1", "artist2"]
        let action = saveRelatedArtists(artists)
        expect(action).toEqual({
            type: SAVE_RELATED_ARTISTS,
            artists: artists
        });
    })
})

describe('updateCurrentArtistSaved', () => {
    it('should create an action', () => {
        const artists = ["artist1", "artist2"]
        let action = updateCurrentArtistSaved(artists)
        expect(action).toEqual({
            type: UPDATE_CURRENT_ARTIST_SAVED,
            artists: artists
        });
    })
})

describe('updateCurrentArtistSaved', () => {
    it('should create an action', () => {
        let action = fetchToggleArtistSaved()
        expect(action).toEqual({
            type: FETCH_TOGGLE_ARTIST_SAVED
        });
    })
})