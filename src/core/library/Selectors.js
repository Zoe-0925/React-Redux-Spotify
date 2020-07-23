export function getTrackIdAndIndex(state) {
    return state.LibraryReducer.get("trackToToggle")  //return id
}

export function getTrackToToggle(state) {
    return state.LibraryReducer.get("trackToToggle")  //return id
}

export function getArtistToToggle(state) {
    return state.LibraryReducer.get("artistoToggle") //return id
}

export function getAlbumToToggle(state) {
    return state.LibraryReducer.get("albumToToggle") //return id
}

export function getPlaylistToToggle(state) {
    return state.LibraryReducer.get("playlistToToggle") //return id
}

