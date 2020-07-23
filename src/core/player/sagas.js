import { all, select, takeLatest, fork, put } from 'redux-saga/effects';
import { PLAY_PREVIOUS_SONG, PLAY_NEXT_SONG, PLAY_SONG, play } from "./Actions"
import { UPDATE_PLAYING_TRACKS } from "../track/Actions"
import { getPlayingTracks } from "../track/Selectors"
import {getPlayingTrack} from "./Selectors"

export function* updateplay() {
    put(UPDATE_PLAYING_TRACKS)
}

export function* playPreviousSong() {
    //get the tracks from the track reducer
    //get index of the current playing track
    const [tracks, currentTrack] = yield all([
        select(getPlayingTracks),
        select(getPlayingTrack)
    ])
    let cursor = {
        current: tracks[tracks.indexOf(currentTrack) - 1],
        previous: tracks[tracks.indexOf(currentTrack) - 2],
        next: currentTrack
    }
    //update the cursor object
    put(play(cursor))
}

export function* playNextSong() {
    //get the tracks from the track reducer
    //get index of the current playing track
    const [tracks, currentTrack] = yield all([
        select(getPlayingTracks),
        select(getPlayingTrack)
    ])
    let cursor
    if (tracks.indexOf(currentTrack) === tracks.length - 1) {
        cursor = {
            current: currentTrack,
            previous: tracks[tracks.indexOf(currentTrack) - 1],
            next: tracks[tracks.indexOf(currentTrack) + 1]
        }
    } else {
        cursor = {
            current: tracks[tracks.indexOf(currentTrack) + 1],
            previous: currentTrack,
            next: tracks[tracks.indexOf(currentTrack) + 2]
        }
    }
    //update the cursor object
    put(play(cursor))
}

export function* watchPlay() {
    yield takeLatest(PLAY_SONG, updateplay)
}

export function* watchPlayPreviousSong() {
    yield takeLatest(PLAY_PREVIOUS_SONG, playPreviousSong)
}

export function* watchPlayNextSong() {
    yield takeLatest(PLAY_NEXT_SONG, playNextSong)
}

export const PlayerSaga = [
    fork(watchPlay),
    fork(watchPlayPreviousSong),
    fork(watchPlayNextSong),
]