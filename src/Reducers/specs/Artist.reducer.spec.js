import {
    SAVE_ARTISTS, FETCH_ARTISTS_ALBUMS_LOADING, SAVE_RELATED_ARTISTS, UPDATE_CURRENT_ARTIST_SAVED,
    FETCH_ARTISTS_ALBUMS_SUCCESSFUL
} from "../../Actions/ArtistActions"
import ArtistReducer from "../Artist.reducer"

const { Map } = require('immutable');

describe('ArtistReducer', () => {
    let data
    let artistId
    let initialState
    let tracks
    let saved
    let albumData ={albums:""}

    beforeEach(() => {
        data = ["artist1", "artist2"]
        artistId = "1"
        tracks = ["track1", "track2"]
        saved = false
        initialState.set("currentArtistSaved", false)
        initialState.set("currentArtistId", "")
        initialState.set("artists", [])
        initialState.set("currentArtistTopTracks", [])
        initialState.set("relatedArtists", [])
    });

    describe('default case', () => {
        it('should return initial state', () => {
            let artists = ArtistReducer(undefined, { type: 'UNDEFINED' })
            expect(artists instanceof Map).toBe(true)
            expect(artists.get("currentArtistSaved")).toBe(false)
            expect(artists.get("currentArtistId")).toBe(false)
            expect(artists.get('artists')).toEqual([]);
            expect(artists.get('currentArtistTopTracks')).toEqual([]);
            expect(artists.get('relatedArtists')).toEqual([]);
        });
    });

    describe('SAVE_ARTISTS', () => {
        it('should return the state with saved artists', () => {
            let artists = ArtistReducer(data, {
                type: SAVE_ARTISTS,
                artists: data
            })
            expect(artists.get("artists")).toEqual()

        });
    });

    describe('FETCH_ARTISTS_ALBUMS_LOADING', () => {
        it('should ', () => {
            let artists = ArtistReducer(data, {
                type: FETCH_ARTISTS_ALBUMS_LOADING,
                artistId: artistId
            })
            expect(artists.get("currentArtistId")).toBe("1")
            expect(artists.get("relatedArtists")).toEqual([])
            expect(artists.get("currentArtistTopTracks")).toEqual([])
        });
    });

    describe('SAVE_RELATED_ARTISTS', () => {
        it('should return initial state', () => {
            let artists = ArtistReducer(data, {
                type: SAVE_RELATED_ARTISTS,
                artists: data
            })
            expect(artists.get("relatedArtists")).toEqual(["artist1", "artist2"])
        });
    });

    describe('UPDATE_CURRENT_ARTIST_SAVED', () => {
        it('should return initial state', () => {
            let artists = ArtistReducer(saved, {
                type: UPDATE_CURRENT_ARTIST_SAVED,
                artists: saved
            })
            expect(artists.get("currentArtistSaved")).toBe(false)
        });
    });

    describe('FETCH_ARTISTS_ALBUMS_SUCCESSFUL', () => {
        it('should return initial state', () => {
            let artists = ArtistReducer(saved, {
                type: FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
               data:
            })
            expect(artists.get("currentArtistSaved")).toBe(false)
        });
    });


    

})