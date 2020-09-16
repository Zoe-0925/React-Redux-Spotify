import { fork, takeLatest, select, put } from 'redux-saga/effects';
import {
    saveRemoveTrack, saveRemoveAlbum, followUnfollowArtist, // checkFollowAlbum, checkFollowTracks
} from "../Components/Api/ApiCalls"

import {
    getTrackIdAndIndex, getArtistToToggle, getAlbumToToggle, // getPlaylistToToggle,
    getCurrentAlbumId, getToken
} from "../Reducers/Selectors"
import {
    FETCH_TOGGLE_ALBUM_SAVED_LOADING, toggleTrack, toggleAlbum,  //toggleArtist, togglePlaylist,   LOAD_LIBRARY_PAGE, 
} from "../Actions/LibraryActions"
import {
    FETCH_TOGGLE_ARTIST_SAVED,
    // FETCH_ARTISTS_ALBUMS_SUCCESSFUL
} from "../Actions/ArtistActions"


//TODO need the track index, and track id.
// check if this index has been saved
// and dispatch it accordingly
export function* fetchToggleTrack() {
    const token = yield select(getToken)
    while (select(getTrackIdAndIndex) === "") {
        yield select(getTrackIdAndIndex)
    }
    //fetch add track
    const trackInfo = yield select(getTrackIdAndIndex)  // not this selector.

    let responseStatus = yield saveRemoveTrack(token, trackInfo.trackId)  // PUT or DELETE
    if (responseStatus === 200 || "200") {
        yield put(toggleTrack()) //Toggle the state
    }
}

export function* fetchToggleAlbum() {
    console.log("called")
    const token = yield select(getToken)
    while (select(getAlbumToToggle) === undefined || "") {
        yield select(getAlbumToToggle)
    }
    let albumId = yield select(getCurrentAlbumId)
    while (select(getCurrentAlbumId) === "") { albumId = yield select(getCurrentAlbumId) }
    //select the store to see if the current album is saved or not.
    let saved = yield select(getAlbumToToggle)
    let responseStatus = ""
    if (saved === false) {  //save the album
        responseStatus = yield saveRemoveAlbum(token, albumId, "PUT")
    } else {  //remove the album
        responseStatus = yield saveRemoveAlbum(token, albumId, "DELETE")
    }
    if (responseStatus === 200 || "200") {
        yield put(toggleAlbum(!saved)) //Toggle the state
    }
}

export function* fetchToggleArtist() {
    const token = yield select(getToken)
    while (select(getArtistToToggle) === undefined || "") {
        yield select(getArtistToToggle)
    }
    //fetch add track
    let artistId = yield select(getArtistToToggle)
    const saved = yield select(getArtistToToggle)
    while (artistId === "") { artistId = yield select(getArtistToToggle) }
    let responseStatus = ""
    if (saved === false) {  //save the album
        responseStatus = yield followUnfollowArtist(token, artistId, "PUT")
    } else {  //remove the album
        responseStatus = yield followUnfollowArtist(token, artistId, "DELETE")
    }
    if (responseStatus === 200 || "200") {
    }
}

/** 
export function* fetchTogglePlaylist() { }

export function* checkArtistSaved() { }

export function* checkAlbumSaved() { }

export function* checkTracksaved() { }

export function* checkPlaylistSaved() { }
*/

export function* watchToggleAlbumSaved() {// When the user toggles to save or remove the current album
    yield takeLatest(FETCH_TOGGLE_ALBUM_SAVED_LOADING, fetchToggleAlbum)
}

export function* watchToggleArtistSaved() {// When the user toggles to follow or unfollow the current artist
    yield takeLatest(FETCH_TOGGLE_ARTIST_SAVED, fetchToggleArtist)
}

export const LibrarySaga = [
    fork(watchToggleArtistSaved),
    fork(watchToggleAlbumSaved),
]