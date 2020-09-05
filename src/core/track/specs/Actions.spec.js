import {
    fetchAlbumTracksLoading, fetchAlbumTracksSuccessful, fetchAlbumTracksFailed,
    fetchAlbumTracksFailed, play, pause, stop, previous, resume, next, updateCurrentAlbumSaved,
    updateCurrentTracksSaved, fetchToggleAlbumSaved,
    FETCH_ALBUM_TRACKS_FAILED,
    FETCH_ALBUM_TRACKS_LOADING, FETCH_ALBUM_TRACKS_SUCCESSFUL, FETCH_ALBUM_TRACKS_FAILED,
    FETCH_TOGGLE_ALBUM_SAVED, UPDATE_CURRENT_TRACKS_SAVED, UPDATE_CURRENT_ALBUM_SAVED,
    RESUME_SONG, PLAY_NEXT_SONG, PLAY_PREVIOUS_SONG, STOP_SONG, PAUSE_SONG, PLAY_SONG,
} from "../Actions"

describe('fetchAlbumTracksLoading ', () => {
    it('should create an action', () => {
        const albumId = "id1"
        let action = fetchAlbumTracksLoading(albumId);
        expect(action).toEqual({
            type: FETCH_ALBUM_TRACKS_LOADING,
            albumId: albumId,
        });
    })
})

describe('fetchAlbumTracksSuccessful ', () => {
    it('should create an action', () => {
        const data = "data"
        let action = fetchAlbumTracksSuccessful(data);
        expect(action).toEqual({
            type: FETCH_ALBUM_TRACKS_SUCCESSFUL,
            data: data,
        });
    })
})

describe('play ', () => {
    it('should create an action', () => {
        const trackUrl = "trackUrl"
        const trackUrls = ["trackUrl1", "trackUrl2"]
        let action = play(trackUrl, trackUrls);
        expect(action).toEqual({
            type: PLAY_SONG,
            currentUrl: trackUrl,
            allUrls: trackUrls
        });
    })
})

describe('pause', () => {
    it('should create an action', () => {
        let action = pause();
        expect(action).toEqual({
            type: PAUSE_SONG,
        });
    })
})

describe('stop', () => {
    it('should create an action', () => {
        let action = stop();
        expect(action).toEqual({
            type: STOP_SONG,
        });
    })
})

describe('previous', () => {
    it('should create an action', () => {
        let action = previous();
        expect(action).toEqual({
            type: PLAY_PREVIOUS_SONG
        });
    })
})

describe('next', () => {
    it('should create an action', () => {
        let action = next();
        expect(action).toEqual({
            type: PLAY_NEXT_SONG
        });
    })
})

describe('resume ', () => {
    it('should create an action', () => {
        let action = resume();
        expect(action).toEqual({
            type: RESUME_SONG
        });
    })
})

describe('updateCurrentAlbumSaved', () => {
    it('should create an action', () => {
        const data = "data"
        let action = updateCurrentAlbumSaved(data);
        expect(action).toEqual({
            type: UPDATE_CURRENT_ALBUM_SAVED,
            data: data
        });
    })
})

describe('updateCurrentTracksSaved', () => {
    it('should create an action', () => {
        const data = "data"
        let action = updateCurrentAlbumSaved(data);
        expect(action).toEqual({
            type: UPDATE_CURRENT_TRACKS_SAVED,
            data: data
        });
    })
})

describe('fetchToggleAlbumSaved', () => {
    it('should create an action', () => {
        let action =  fetchToggleAlbumSaved();
        expect(action).toEqual({
            type: FETCH_TOGGLE_ALBUM_SAVED
        });
    })
})


