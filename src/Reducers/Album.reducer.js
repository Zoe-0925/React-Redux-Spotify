import { SAVE_ALBUMS } from "../Actions/AlbumActions"
import { FETCH_ARTISTS_ALBUMS_LOADING, FETCH_ARTISTS_ALBUMS_SUCCESSFUL } from "../Actions/ArtistActions"
import { removeDuplicateAlbums } from "../Components/Utils/Utils"
import { FETCH_ALBUM_TRACKS_LOADING, FETCH_ALBUM_TRACKS_SUCCESSFUL } from "../Actions/TrackActions"

const initialState = new Map()
initialState.set("albums", [])
initialState.set("currentAlbumId", "")
initialState.set("currentArtistAlbums", [])

const AlbumReducer = (state = initialState, action) => {
    let newState = new Map(state)
    let newList = []
    let trimmedList = []
    switch (action.type) {
        case FETCH_ALBUM_TRACKS_LOADING:
            newState.set("currentAlbumId", action.albumId)
            return newState
        case FETCH_ALBUM_TRACKS_SUCCESSFUL:
            const trackIds = action.data.map(each => each.get("id"))
            const currentAlbumId = newState.get("currentAlbumId")
            let currentAlbum = newState.get("albums").find(item => item.get("albumId") === currentAlbumId)
            currentAlbum.set("tracks", trackIds)
            return newState
        case SAVE_ALBUMS:
            let trimmedData = removeDuplicateAlbums(action.albums)
            newList = trimmedData.concat(state.get("albums"))
            trimmedList = removeDuplicateAlbums(newList)
            newState.set("albums", trimmedList)
            return newState
        case FETCH_ARTISTS_ALBUMS_LOADING:
            newState.set("currentArtistAlbums", [])
            return newState
        case FETCH_ARTISTS_ALBUMS_SUCCESSFUL:
            let trimmedAlbums = removeDuplicateAlbums(action.data.albums)
            let trimmedSingles = removeDuplicateAlbums(action.data.singles)
            trimmedList = {
                albums: trimmedAlbums,
                singles: trimmedSingles
            }
            newState.set("currentArtistAlbums", trimmedList)
            return newState
        default:
            return state
    }

}

export default AlbumReducer
