
export function getPlayingTrack(state) {
    return state.PlayerReducer.get("currentTrack")
}