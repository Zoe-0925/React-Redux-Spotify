import {
    FETCH_ALBUM_TRACKS_LOADING, FETCH_ALBUM_TRACKS_SUCCESSFUL, PLAY_SONG, STOP_SONG,
    PAUSE_SONG, RESUME_SONG, PLAY_NEXT_SONG, PLAY_PREVIOUS_SONG, UPDATE_CURRENT_ALBUM_SAVED,
    UPDATE_CURRENT_TRACKS_SAVED
} from "../Actions"

const { Map } = require('immutable');

describe('TrackReducer', () => {
    let data
    let albumId
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
        albumId = "1"
        albumIds = [album1, album2]
        data = ["track1", "track2"]
        initialEntity.set("currentPlaying", "")  //index, url
        initialEntity.set("songPaused", true)
        initialEntity.set("songPlaying", false)
        initialEntity.set("timeElapsed", 0)
        initialEntity.set("currentAlbumId", "")
        initialEntity.set("currentAlbumSaved", false)
        initialEntity.set("track", []) //Inside the tracks are objects of {albumId:"", tracks:[]}
        initialEntity.set("artists", [])
        initialEntity.set("currentDisplayTracks", [])
        initialEntity.set("currentPlayingTracks", [])
        initialEntity.set("currentTracksSaved", [])
    });

    describe('default case', () => {
        it('should return initial state', () => {
            let tracks = TrackReducer(undefined, { type: 'UNDEFINED' })
            expect(tracks instanceof Map).toBe(true)
            expect(tracks.get("currentPlaying")).toBe("")
            expect(tracks.get("songPaused")).toBe(true)
            expect(tracks.get("songPlaying")).toBe(false)
            expect(tracks.get("timeElapsed")).toBe(0)
            expect(tracks.get("currentAlbumId")).toBe(0)
            expect(tracks.get("currentAlbumSaved")).toBe(false)
            expect(tracks.get("track")).toEqual([])
            expect(tracks.get("artists")).toEqual([])
            expect(tracks.get("currentDisplayTracks")).toEqual([])
            expect(tracks.get("currentPlayingTracks")).toEqual([])
            expect(tracks.get("currentTracksSaved")).toEqual([])
        });
    });

    describe(FETCH_ALBUM_TRACKS_LOADING, () => {
        it('should clear the currentDisplayTracks and update the currentAlbumId', () => {
            let tracks = TrackReducer(initialState, {
                type: FETCH_ALBUM_TRACKS_LOADING,
                albumId: albumId,
            })
            expect(tracks.get("currentDisplayTracks")).toEqual([])
            expect(tracks.get("currentAlbumId")).toBe("1")
        });
    });

    describe(FETCH_ALBUM_TRACKS_SUCCESSFUL, () => {
        it('should clear the currentDisplayTracks and update the currentAlbumId', () => {
            let tracks = TrackReducer(initialState, {
                type: FETCH_ALBUM_TRACKS_SUCCESSFUL,
                data: data,
            })
            expect(tracks.get("currentDisplayTracks")).toEqual(["track1", "track2"])
            expect(tracks.get("track")).toEqual(["track1", "track2"])
        });
    });

    describe(PLAY_SONG, () => {
        it('should set songPlaying to be true and songPaused to be false', () => {
            let tracks = TrackReducer(initialState, {
                type: PLAY_SONG,
                currentUrl: trackUrl,
                allUrls: trackUrls
            })
            expect(tracks.get("songPlaying")).toBe(true)
            expect(tracks.get("songPaused")).toBe(false)
        });
    });

    describe(STOP_SONG, () => {
        it('should set songPlaying to be true and songPaused to be false', () => {
            let tracks = TrackReducer(initialState, {
                type: STOP_SONG,
            })
            expect(tracks.get("currentPlaying")).toBe("")
            expect(tracks.get("songPlaying")).toBe(false)
            expect(tracks.get("songPaused")).toBe(true)
        });
    });

    describe(PAUSE_SONG, () => {
        it('should set songPlaying to be true and songPaused to be false', () => {
            let tracks = TrackReducer(initialState, {
                type: PAUSE_SONG,
            })
            expect(tracks.get("songPaused")).toBe(true)
        });
    });

    describe(RESUME_SONG, () => {
        it('should set songPlaying to be true and songPaused to be false', () => {
            let tracks = TrackReducer(initialState, {
                type: RESUME_SONG,
            })
            expect(tracks.get("songPaused")).toBe(false)
        });
    });

    describe(PLAY_NEXT_SONG, () => {
        it('', () => {
            let tracks = TrackReducer(initialState, {
                type: PLAY_NEXT_SONG,
            })

            //TODO 

        });
    });

    describe(PLAY_PREVIOUS_SONG, () => {
        it('', () => {
            let tracks = TrackReducer(initialState, {
                type: PLAY_NEXT_SONG,
            })

            //TODO 

        });
    });

    describe(UPDATE_CURRENT_ALBUM_SAVED, () => {
        it('should update the currentAlbumSaved', () => {
            let tracks = TrackReducer(initialState, {
                type: UPDATE_CURRENT_ALBUM_SAVED,
                data: data
            })
            expect(tracks.get("currentAlbumSaved")).toBe("track1")
        });
    });


    describe(UPDATE_CURRENT_TRACKS_SAVED, () => {
        it('should update the currentAlbumSaved', () => {
            let tracks = TrackReducer(initialState, {
                type: UPDATE_CURRENT_TRACKS_SAVED,
                data: data
            })
            expect(tracks.get("currentTracksSaved")).toEqual(data)
        });
    });

})

