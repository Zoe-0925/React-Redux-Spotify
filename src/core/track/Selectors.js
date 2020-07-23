
//TODO not using
//export function findTracksById(state, idList) {
    //TODO the idList is the album id, and is a single id!!!
  //  const tracks = state.TrackReducer.get("track")
  //  const result = tracks.filter(item => !idList.includes(item.get("id")))
   // return result
//}

export function getTrackIds(state) {
    return state.TrackReducer.get("currentDisplayTracks").map(each => each.get("id"))
}


export function getTracks(state){
    return state.TrackReducer.get("track")
}


export function getCurrentTracks(state){
    return state.TrackReducer.get("currentDisplayTracks")
}

export function getPlayingTracks(state){
    return state.TrackReducer.get("currentPlayingTracks")
}