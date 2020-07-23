import {
    PLAY_SONG, PAUSE_SONG, STOP_SONG, RESUME_SONG
} from "./Actions"

const { Map } = require('immutable');

//TODO buggy buggy buggy!!!!!

let initialEntity = new Map()
initialEntity.set("currentTrack", "")  //a track object
initialEntity.set("songPaused", true)
initialEntity.set("songPlaying", false)
initialEntity.set("cursor", "")  //previous track, next track

const PlayerReducer = (state = initialEntity, action) => {

    switch (action.type) {
        case PLAY_SONG:
            let newMap = new Map()
            newMap.set("songPlaying", true)
            newMap.set("songPaused", false)
            newMap.set("currentTrack", action.current)
            const cursor = {
                previous: action.previous,
                next: action.next
            }
            newMap.set("cursor", cursor)
            console.log("new map", newMap)
            return newMap

        //for next and previous song, 
        //call the saga and saga manages the cursor and put PLAY_SONG

        //    case STOP_SONG:
        // newMap.set("currentTrack", "")
        //   newMap.set("songPlaying", false)
        //   newMap.set("songPaused", true)
        //   return newMap
        //    case PAUSE_SONG: //songPlaying is true
        //      newMap.set("songPaused", true)
        //      return newMap
        //  case RESUME_SONG:
        //     newMap.set("songPaused", false)
        //    return newMap
        default:
            return state;
    }
}

export default PlayerReducer