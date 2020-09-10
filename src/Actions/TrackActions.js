export const FETCH_ALBUM_TRACKS_LOADING = "FETCH_ALBUM_TRACKS_LOADING"
export const FETCH_ALBUM_TRACKS_SUCCESSFUL = "FETCH_ALBUM_TRACKS_SUCCESSFUL"
export const FETCH_ALBUM_TRACKS_FAILED = "FETCH_ALBUM_TRACKS_FAILED"
export const UPDATE_CURRENT_ALBUM_SAVED = "UPDATE_ALBUM_SAVED"
export const UPDATE_CURRENT_TRACKS_SAVED = "UPDATE_TRACKS_SAVED"
export const UPDATE_DISPLAY_TRACKS = "UPDATE_DISPLAY_TRACKS"
export const UPDATE_PLAYING_TRACKS = "UPDATE_PLAYING_TRACKS"

export const fetchAlbumTracksLoading = (albumId) => ({
    type: FETCH_ALBUM_TRACKS_LOADING,
    albumId: albumId,
})

export const fetchAlbumTracksSuccessful = (data) => ({
    type: FETCH_ALBUM_TRACKS_SUCCESSFUL,
    data: data,
    //albumId:albumId
})

export const fetchAlbumTracksFailed = (albumId, err) => ({
    type: FETCH_ALBUM_TRACKS_FAILED,
    error: err
})

export const updateDisplayTracks = (data)=> ({
    type: UPDATE_DISPLAY_TRACKS,
    data: data,
})