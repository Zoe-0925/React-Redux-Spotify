import {
    PLAY_SONG, PAUSE_SONG, STOP_SONG, RESUME_SONG
} from "../Actions/PlayerActions"

const { Map } = require('immutable');

let initialEntity = new Map()
initialEntity.set("songPaused", true)
initialEntity.set("songPlaying", false)
initialEntity.set("timeElapsed", 0)
initialEntity.set("url", "")
//"songDetails"


const PlayerReducer = (state = initialEntity, action) => {
    let newMap = new Map()
    switch (action.type) {
        case "FETCH_SONGS_SUCCESS":
            newMap.set("songs", action.songs)
            return newMap
        case PLAY_SONG:
            newMap.set("songPlaying", true)
            newMap.set("songPaused", false)
            newMap.set("songDetails", action.song)
            newMap.set("url", action.song.url)
            newMap.set("timeElapsed", 0)
            return newMap
        case STOP_SONG:
            newMap.set("songPlaying", false)
            newMap.set("songPaused", true)
            newMap.set("songDetails", null)
            newMap.set("timeElapsed", 0)
            return newMap
        case PAUSE_SONG:
            newMap.set("songPaused", true)
            return newMap
        case RESUME_SONG:
            newMap.set("songPaused", false)
            return newMap
        case "INCREASE_SONG_TIME":
            newMap.set("timeElapsed", action.time)
            return newMap
        default:
            return state;
    }
}

export default PlayerReducer