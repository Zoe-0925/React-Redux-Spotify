import {
    SAVE_ARTISTS, FETCH_ARTISTS_ALBUMS_LOADING,
    SAVE_RELATED_ARTISTS, UPDATE_CURRENT_ARTIST_SAVED, FETCH_ARTISTS_ALBUMS_SUCCESSFUL
} from "../Actions/ArtistActions"

const initialState = new Map()
initialState.set("currentArtistId", "")
initialState.set("currentArtist", {})
initialState.set("artists", [])
initialState.set("relatedArtists", [])

const ArtistReducer = (state = initialState, action) => {
    let newState = new Map(state)
    switch (action.type) {
        case SAVE_ARTISTS:
            const newArtists = action.artists.concat(state.get("artists"))
            newState.set("artists", newArtists)
            return newState
        case FETCH_ARTISTS_ALBUMS_LOADING:
            newState.set("currentArtistId", action.artistId)
            const artist = newState.get("artists").find(item => item.get("artistId") === action.artistId)
            newState.set("currentArtist", artist)
            console.log("current artist ", newState.get("currentArtist"))
            newState.set("relatedArtists", [])
            return newState
        case FETCH_ARTISTS_ALBUMS_SUCCESSFUL:
            const albumIds = action.data.albums.map(each => each.get("albumId"))
            const singleIds = action.data.singles.map(each => each.get("albumId"))
            console.log("artists seem to go wrong", newState.get("artists"))
            const types = newState.get("artists").map(each => typeof each)
            console.log("artist object types", types)
            newState.get("currentArtist").set("albums", {
                albums: albumIds,
                singles: singleIds
            })  //Object, not map
            return newState
        case SAVE_RELATED_ARTISTS:
            const relatedArtistIds = action.artists.map(each => each.get("artstId"))
            // save the ids of the related artists into the current artist
            newState.get("currentArtist").set("relatedArtists", relatedArtistIds)
            const mergedArtists = newState.get("artists").concat(action.artists)
            newState.set("artists", mergedArtists)
            newState.set("relatedArtists", action.artists)
            return newState
        case UPDATE_CURRENT_ARTIST_SAVED:
            newState.get("currentArtist").set("saved", action.data[0])
            return newState
        default:
            return state;
    }
}

export default ArtistReducer;