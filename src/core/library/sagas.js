import { fork, all, takeLatest, select, takeEvery, put } from 'redux-saga/effects';
import {
    saveRemoveTrack, saveRemoveAlbum, followUnfollowArtist, checkFollowAlbum,
    checkFollowTracks
} from "../api/api-calls"

import {
    getTrackIdAndIndex,getArtistToToggle, getAlbumToToggle, getPlaylistToToggle,
    getCurrentAlbumId ,getToken
} from "../Selectors"
import {
    LOAD_LIBRARY_PAGE, FETCH_TOGGLE_ALBUM_SAVED_LOADING,
    LOAD_NEXT_TRACKS, toggleTrack, toggleAlbum, toggleArtist, togglePlaylist
} from "./Actions"
import { FETCH_TOGGLE_ARTIST_SAVED, FETCH_ARTISTS_ALBUMS_SUCCESSFUL } from "../artist/Actions"

export function* fetchNextTracks() {
    //The library page should save the page number to the store

    //get page number from the store
    //and call fetch 
    //save the returned data to the next tracks in the library reducer

}

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

export function* fetchTogglePlaylist() { }

export function* checkArtistSaved() { }

export function* checkAlbumSaved() { }

export function* checkTracksaved() { }

export function* checkPlaylistSaved() { }

export function* checkLibrarySaved() { }



export function* watchFetchNextTracks() {
    yield takeLatest(LOAD_NEXT_TRACKS, fetchNextTracks)
}



export function* watchToggleAlbumSaved() {// When the user toggles to save or remove the current album
    yield takeLatest(FETCH_TOGGLE_ALBUM_SAVED_LOADING, fetchToggleAlbum)
}

export function* watchToggleArtistSaved() {// When the user toggles to follow or unfollow the current artist
    yield takeLatest(FETCH_TOGGLE_ARTIST_SAVED, fetchToggleArtist)
}

export function* watchCheckLibraryPageSaved() {
    yield takeLatest(LOAD_LIBRARY_PAGE, checkLibrarySaved)
}

export const LibrarySaga = [
    fork(watchFetchNextTracks),
    fork(watchCheckLibraryPageSaved),
    fork(watchToggleArtistSaved),
    fork(watchToggleAlbumSaved),
]