export const SAVE_TO_SAVED_ALBUMS = "SAVE_TO_SAVED_ALBUMS"
export const SAVE_TO_SAVED_ARTISTS = "SAVE_TO_SAVED_ARTISTS"
export const SAVE_TO_SAVED_PLAYLISTS = "SAVE_TO_SAVED_PLAYLISTS"
export const SAVE_TO_SAVED_TRACKS = "SAVE_TO_SAVED_TRACKS"
export const LOAD_LIBRARY_PAGE = "LOAD_LIBRARY_PAGE"
export const LOAD_NEXT_TRACKS = "LOAD_NEXT_TRACKS"
export const TOGGLE_TRACK = "TOGGLE_TRACK"
export const TOGGLE_ALBUM = "TOGGLE_ALBUM"
export const TOGGLE_ARTIST = "TOGGLE_ARTIST"
export const TOGGLE_PLAYLIST = "TOGGLE_LAYLIST"
export const FETCH_TOGGLE_ALBUM_SAVED_LOADING = "FETCH_TOGGLE_ALBUM_SAVED_LOADING"
export const FETCH_TOGGLE_TRACKS_SAVED_LOADING = "FETCH_TOGGLE_TRACKS_SAVED_LOADING"
export const FETCH_TOGGLE_ALBUM_SAVED_SUCCESSFUL = "FETCH_TOGGLE_ALBUM_SAVED_SUCCESSFUL"
export const FETCH_TOGGLE_TRACKS_SAVED_SUCCESSFUL = "FETCH_TOGGLE_TRACKS_SAVED_SUCCESSFUL"
export const SAVE_TO_RECENTLY_PLAYED = "SAVE_TO_RECENTLY_PLAYED"
export const SAVE_TO_USERS_TOP_TRACKS = "SAVE_TO_USERS_TOP_TRACKS"
export const FETCH_HOME_PAGE_PLAYLISTS = "FETCH_HOME_PAGE_PLAYLISTS"
export const SAVE_TO_FIRST_ARTISTS_TRACKS = "SAVE_TO_FIRST_ARTISTS_TRACKS"
export const SAVE_TO_SECOND_ARTISTS_TRACKS = "SAVE_TO_SECOND_ARTISTS_TRACKS"


export const loadLibraryPage = () => ({
    type: LOAD_LIBRARY_PAGE,
})

export const saveToSavedAlbums = (albums) => ({
    type: SAVE_TO_SAVED_ALBUMS,
    albumIds: albums,  //Note: changed from ids to albums atm
})

export const saveToSavedArtists = (artists) => ({
    type: SAVE_TO_SAVED_ARTISTS,
    artistIds: artists, //Note: changed from ids to artists atm
})

export const saveToSavedPlaylists = (albumIds) => ({
    type: SAVE_TO_SAVED_PLAYLISTS,
    albumIds: albumIds,
})

export const saveToSavedTracks = (tracks) => ({
    type: SAVE_TO_SAVED_TRACKS,
    tracks: tracks,
})

export const loadNextTracks = tracks => ({
    type: LOAD_NEXT_TRACKS,
    tracks: tracks,
})

export const toggleTrack = (trackId, index) => ({
    type: TOGGLE_TRACK,
    data: {
        trackId: trackId,
        index: index
    }
})

export const toggleArtist = data => ({
    type: TOGGLE_ARTIST,
    data: data,
})

export const toggleAlbum = data => ({
    type: TOGGLE_ALBUM,
    data: data,
})

export const togglePlaylist = data => ({
    type: TOGGLE_PLAYLIST,
    data: data,
})

export const fetchToggleAlbumSavedLoading = () => ({
    type: FETCH_TOGGLE_ALBUM_SAVED_LOADING
})

export const fetchToggleAlbumSavedSuccessful = (data) => ({
    type: FETCH_TOGGLE_ALBUM_SAVED_SUCCESSFUL,
    data: data
})

export const saveToRecentlyPlay = (albumIds) => {
    return ({
        type: SAVE_TO_RECENTLY_PLAYED,
        albumIds: albumIds,
    })
}

export const saveToUserTopTracks = (albumIds) => {
    return ({
        type: SAVE_TO_USERS_TOP_TRACKS,
        albumIds: albumIds,
    })
}

export const saveToFirstArtistsTracks = (albumIds) => {
    return ({
        type: SAVE_TO_FIRST_ARTISTS_TRACKS,
        albumIds: albumIds,
    })
}

export const saveToSecondArtistsTracks = (albumIds) => {
    return ({
        type: SAVE_TO_SECOND_ARTISTS_TRACKS,
        albumIds: albumIds,
    })
}

