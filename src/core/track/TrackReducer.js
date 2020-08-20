import {
    FETCH_ALBUM_TRACKS_LOADING, FETCH_ALBUM_TRACKS_SUCCESSFUL, UPDATE_DISPLAY_TRACKS,
    UPDATE_PLAYING_TRACKS
} from "./Actions"

let initialEntity = new Map()
initialEntity.set("track", []) //Inside the tracks are objects of {albumId:"", tracks:[]}
initialEntity.set("currentDisplayTracks", [])
initialEntity.set("currentPlayingTracks", [])

const TrackReducer = (state = initialEntity, action) => {
    let newMap = new Map(state)
    switch (action.type) {
        case FETCH_ALBUM_TRACKS_LOADING:
            newMap.set("currentDisplayTracks", [])
            return newMap
        case FETCH_ALBUM_TRACKS_SUCCESSFUL:
            //let the tracks be displayed
            newMap.set("currentDisplayTracks", action.data)
            //Save the tracks into the track state
            let newTrakcs = newMap.get("track").concat(action.data)
            newMap.set("track", newTrakcs)
            // Inside the album reducer, 
            // Append the track ids into the corresponding album object
            return newMap
        case UPDATE_DISPLAY_TRACKS:
            newMap.set("currentDisplayTracks", action.data)
            return newMap
        case UPDATE_PLAYING_TRACKS:
            newMap.set("currentPlayingTracks", newMap.get("currentDisplayTracks"))
            return newMap
        default:
            return state;
    }

}

export default TrackReducer;