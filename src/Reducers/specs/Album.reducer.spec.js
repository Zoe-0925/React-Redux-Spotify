const { Map } = require('immutable');
import { FETCH_ARTISTS_ALBUMS_LOADING } from "../ArtistActions"
import { SAVE_ALBUMS, FETCH_ARTISTS_ALBUMS_SUCCESSFUL } from "../../Actions/AlbumActions"

describe('AlbumReducer', () => {
    let data
    let data2
    let initialState
    const album1 = new Map({
        "albumId": "1",
        "albumName": "album1",
    })
    const album2 = new Map({
        "albumId": "2",
        "albumName": "album2",
    })

    beforeEach(() => {
        data = [album1, album1, album2]
        data2 = {
            albums: ["album1", "album2", "album3"],
            singles: ["single1", "single2", "single3"]
        }
        initialState = new Map()
        initialState.set("savedAlbumIds", [])
        initialState.set("albums", [])
        initialState.set("currentArtistAlbums", [])
    });

    describe('default case', () => {
        it('should return initial state', () => {
            let albums = AlbumReducer(undefined, { type: 'UNDEFINED' });
            expect(albums instanceof Map).toBe(true);
            expect(albums.get('savedAlbumIds')).toEqual([]);
            expect(albums.get('albums')).toEqual([]);
            expect(albums.get('currentArtistAlbums')).toEqual([]);
        });
    });

    describe('SAVE_ALBUMS', () => {
        it('should return a new state that contains the saved albums', () => {
            let albums = AlbumReducer(initialState, { type: SAVE_ALBUMS, albums: data });
            expect(albums.get('albums')).toEqual([album1, album2]);
        });
    });

    describe('FETCH_ARTISTS_ALBUMS_LOADING', () => {
        it('should clear the currentArtistAlbums', () => {
            let artistId = "1"
            let albums = AlbumReducer(undefined, {
                type: FETCH_ARTISTS_ALBUMS_LOADING,
                artistId: artistId
            });
            expect(albums.get('currentArtistAlbums')).toEqual([]);
        });
    });

    describe('FETCH_ARTISTS_ALBUMS_SUCCESSFUL', () => {
        it('should ', () => {
            let albums = AlbumReducer(undefined, {
                type: FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
                data: data2
            });
            expect(albums.get('currentArtistAlbums')).toEqual({
                albums: ["album1", "album2", "album3"],
                singles: ["single1", "single2", "single3"]
            });
        });
    });
})