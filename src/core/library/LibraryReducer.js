import { SAVED_ALBUMS, SAVED_ARTISTS, SAVED_PLAYLISTS, SAVED_TRACKS, NEXT_TRACKS,
    RECENTLY_PLAYED,USERS_TOP_TRACKS } from "../Constants"
import {
    LOAD_LIBRARY_PAGE, SAVE_TO_SAVED_ALBUMS, SAVE_TO_SAVED_ARTISTS, SAVE_TO_SAVED_TRACKS,
    LOAD_NEXT_TRACKS, TOGGLE_TRACK, TOGGLE_ARTIST, TOGGLE_ALBUM, TOGGLE_PLAYLIST,
    SAVE_TO_RECENTLY_PLAYED, SAVE_TO_USERS_TOP_TRACKS
} from "./Actions"

let initialState = new Map()
//initialState.set("loading", false)
initialState.set("libraryLoaded", false)
initialState.set(SAVED_ALBUMS, [])
initialState.set(SAVED_ARTISTS, [])
initialState.set(SAVED_PLAYLISTS, [])
initialState.set(SAVED_TRACKS, [])
initialState.set(NEXT_TRACKS, [])
initialState.set("albumToToggle", "")
initialState.set("artistToToggle", "")
initialState.set("trackToToggle", [])  //TODO set it to be a single track id so far
initialState.set("playlistToToggle", "")
initialState.set("trackToChange", "")
initialState.set(RECENTLY_PLAYED, [])
initialState.set(USERS_TOP_TRACKS, [])


const LibraryReducer = (state = initialState, action) => {
    let newState = new Map(state)
    switch (action.type) {
        case LOAD_LIBRARY_PAGE:
            newState.set("libraryLoaded", true)
            return newState
        case SAVE_TO_SAVED_ALBUMS:
            newState.set(SAVED_ALBUMS, action.albumIds)
            return newState
        case SAVE_TO_SAVED_ARTISTS:
            newState.set(SAVED_ARTISTS, action.artistIds)
            return newState
        case SAVE_TO_SAVED_TRACKS:
            newState.set(SAVED_TRACKS, action.tracks)
            return newState
        case SAVE_TO_RECENTLY_PLAYED:
            newState.set(RECENTLY_PLAYED, action.albumIds)
            return newState
        case SAVE_TO_USERS_TOP_TRACKS:
            newState.set(USERS_TOP_TRACKS, action.albumIds)
            return newState
        case LOAD_NEXT_TRACKS:
            if (newState.get(NEXT_TRACKS).length > 0) {
                let allTrakcs = newState.get(NEXT_TRACKS).concat(newState.get(SAVED_TRACKS))
                newState.set(SAVED_TRACKS, allTrakcs)
            }
            newState.set(NEXT_TRACKS, action.tracks)
            return newState
        case TOGGLE_TRACK:
            newState.set("trackToToggle", action.data)
            return newState
        case TOGGLE_ALBUM:
            newState.set("albumToToggle", action.data)
            return newState
        case TOGGLE_ARTIST:
            newState.set("artistToToggle", action.data)
            return newState
        case TOGGLE_PLAYLIST:
            newState.set("playlistToToggle", action.data)
            return newState
        default:
            return state;
    }
}

export default LibraryReducer;