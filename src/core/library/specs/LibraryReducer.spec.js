import {
    SAVED_ALBUMS, SAVED_ARTISTS, SAVED_PLAYLISTS, SAVED_TRACKS, NEXT_TRACKS,
    RECENTLY_PLAYED, USERS_TOP_TRACKS,
} from "../../Constants"
import {
    LOAD_LIBRARY_PAGE, SAVE_TO_SAVED_ALBUMS, SAVE_TO_SAVED_ARTISTS, SAVE_TO_SAVED_TRACKS,
    LOAD_NEXT_TRACKS, TOGGLE_TRACK, TOGGLE_ARTIST, TOGGLE_ALBUM, TOGGLE_PLAYLIST, RECENTLY_PLAYED,
    USERS_TOP_TRACKS
} from "../Actions"

describe('LibraryReducer', () => {
    let data
    let toggleData
    let tracks
    let initialState
    let artistIds
    const album1 = new Map({
        "albumId": "1",
        "albumName": "album1",
    })
    const album2 = new Map({
        "albumId": "2",
        "albumName": "album2",
    })


    //TODO is there any better "before" instruction?
    beforeEach(() => {
        data = [album1, album1, album2]
        artistIds = ["1", "2", "3"]
        tracks = ["track1", "track2", "track3"]
        toggleData = [true, true, false]
        initialState.set("libraryLoaded", false)
        initialState.set(SAVED_ALBUMS, [])
        initialState.set(SAVED_ARTISTS, [])
        initialState.set(SAVED_PLAYLISTS, [])
        initialState.set(SAVED_TRACKS, [])
        initialState.set(NEXT_TRACKS, [])
        initialState.set("albumToToggle", "")
        initialState.set("artistToToggle", "")
        initialState.set("trackToToggle", "")  //TODO set it to be a single track id so far
        initialState.set("playlistToToggle", "")
    });

    describe('default case', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(undefined, { type: 'UNDEFINED' })
            expect(library instanceof Map).toBe(true)
            expect(library.get("libraryLoaded")).toBe(false)
            expect(library.get(SAVED_ALBUMS)).toEqual([]);
            expect(library.get(SAVED_ARTISTS)).toEqual([]);
            expect(library.get(SAVED_PLAYLISTS)).toEqual([]);
            expect(library.get(SAVED_TRACKS)).toEqual([]);
            expect(library.get(NEXT_TRACKS)).toEqual([]);
            expect(library.get(RECENTLY_PLAYED)).toEqual([])
            expect(library.get(USERS_TOP_TRACKS)).toEqual([])
            expect(library.get("albumToToggle")).toBe("");
            expect(library.get("artistToToggle")).toBe("");
            expect(library.get("trackToToggle")).toBe("");
            expect(library.get("playlistToToggle")).toBe("");
        });
    });

    describe('LOAD_LIBRARY_PAGE', () => {
        it('should return the state with saved artists', () => {
            let library = LibraryReducer(initialState, {
                type: LOAD_LIBRARY_PAGE,
            })
            expect(library.get("libraryLoaded")).toBe(true)
        });
    });

    describe('SAVE_TO_SAVED_ALBUMS', () => {
        it('should ', () => {
            let library = LibraryReducer(initialState, {
                type: SAVE_TO_SAVED_ALBUMS,
                albumIds: data,
            })
            expect(library.get(SAVED_ALBUMS)).toEqual([album1, album1, album2])
        });
    });

    describe('SAVE_TO_SAVED_ARTISTS', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: SAVE_TO_SAVED_ARTISTS,
                artistIds: artistIds,
            })
            expect(library.get(SAVED_ARTISTS)).toEqual(["1", "2", "3"])
        });
    });

    describe('SAVE_TO_SAVED_PLAYLISTS', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: SAVE_TO_SAVED_PLAYLISTS,
                albumIds: albumIds,
            })
            // TODO not implemented in the reducer yet
        });
    });

    describe('SAVE_TO_SAVED_TRACKS', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: SAVE_TO_SAVED_TRACKS,
                tracks: tracks,
            })
            expect(library.get(SAVED_TRACKS)).toEqual(["track1", "track2", "track3"])
        });
    });

    describe('LOAD_NEXT_TRACKS', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: LOAD_NEXT_TRACKS,
                tracks: tracks,
            })
            //TODO Check reducer and then do here.....
        });
    });


    describe('TOGGLE_TRACK', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: TOGGLE_TRACK,
                data: toggleData,
            })
            expect(library.get("trackToToggle")).toEqual([true, true, false])
        });
    });

    describe('TOGGLE_ALBUM', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: TOGGLE_ALBUM,
                data: true,
            })
            expect(library.get("albumToToggle")).toBe(true)
        });
    });

    describe('TOGGLE_ARTIST', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: TOGGLE_ARTIST,
                data: false,
            })
            expect(library.get("artistToToggle")).toBe(false)
        });
    });

    describe('TOGGLE_PLAYLIST', () => {
        it('should return initial state', () => {
            let library = LibraryReducer(initialState, {
                type: TOGGLE_PLAYLIST,
                data: false,
            })
        });
        expect(library.get("playlistToToggle")).toBe(false)
    });


    describe(SAVE_TO_RECENTLY_PLAYED, () => {
        it('should return the state containing the save data', () => {
            let playlists = PlaylistReducer(initialState, {
                type: SAVE_TO_RECENTLY_PLAYED,
                albumIds: albumIds,
            })
            expect(playlists.get(RECENTLY_PLAYED)).toEqual([album1, album2])
        });
    });

    describe(SAVE_TO_USERS_TOP_TRACKS, () => {
        it('should return the state containing the save data', () => {
            let playlists = PlaylistReducer(initialState, {
                type: SAVE_TO_USERS_TOP_TRACKS,
                albumIds: albumIds,
            })
            expect(playlists.get(USERS_TOP_TRACKS)).toEqual([album1, album2])
        });
    });
})