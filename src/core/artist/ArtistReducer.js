import {
    SAVE_ARTISTS, FETCH_ARTISTS_ALBUMS_LOADING,
    SAVE_RELATED_ARTISTS, UPDATE_CURRENT_ARTIST_SAVED
} from "./Actions"
import { removeDuplicates } from "../utils/Utils"
import { FETCH_ARTISTS_ALBUMS_SUCCESSFUL } from "../album/Actions";

const initialState = new Map()
initialState.set("currentArtistId", "")
initialState.set("artists", [])
initialState.set("relatedArtists", [])

const ArtistReducer = (state = initialState, action) => {
    let newState = new Map(state)
    const artistId = newState.get("currentArtistId")
    let currentArtist = newState.get("artists").find(item => artistId === item.get("artistId"))
    switch (action.type) {
        case SAVE_ARTISTS:
            const newArtists = action.artists.concat(state.get("artists"))
            const trimmedNewArtists = removeDuplicates(newArtists)
            newState.set("artists", trimmedNewArtists)
            return newState
        case FETCH_ARTISTS_ALBUMS_LOADING:
            newState.set("currentArtistId", action.artistId)
            newState.set("relatedArtists", [])
            return newState
        case FETCH_ARTISTS_ALBUMS_SUCCESSFUL:
            const albumIds = action.data.albums.map(each => each.get("albumId"))
            const singleIds = action.data.singles.map(each => each.get("albumId"))
            currentArtist.set("albums", {
                albums: albumIds,
                singles: singleIds
            })  //Object, not map
            return newState
        case SAVE_RELATED_ARTISTS:
            const relatedArtistIds = action.artists.map(each => each.get("artstId"))
            // save the ids of the related artists into the current artist
            currentArtist.set("relatedArtists", relatedArtistIds)
            newState.set("relatedArtists", action.artists)
            return newState
        case UPDATE_CURRENT_ARTIST_SAVED:
            currentArtist.set("saved", action.data[0])
            return newState
        default:
            return state;
    }
}

export default ArtistReducer;