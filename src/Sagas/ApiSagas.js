import { call, take, all, select, takeLatest, fork, put } from 'redux-saga/effects';
import {
    fetchArtistById, fetchArtistsAlbums, fetchAlbumById, fetchSavedAlbums, fetchSavedArtists,
    fetchSavedTracks,
    fetchRelatedArtists, fetchRecentPlayed, fetchUsersTopTracks, fetchUsersTopTwoArtists,
    fetchTracksForAlbum, fetchArtistsTopTracks, checkFollowAlbum, checkFollowTracks, checkFollowArtist
} from "../Components/Api/ApiCalls"

import { SAVE_ACCESS_TOKEN } from "../Actions/UserActions"
import {
    FETCH_ALBUM_TRACKS_LOADING, fetchAlbumTracksSuccessful, updateDisplayTracks
} from "../Actions/TrackActions"
import { saveAlbums } from "../Actions/AlbumActions"
import {
    LOAD_LIBRARY_PAGE, toggleAlbum, toggleTrack, toggleArtist,
    saveToSavedAlbums, saveToSavedArtists, saveToRecentlyPlay, saveToUserTopTracks
} from "../Actions/LibraryActions"
import {
    FETCH_ARTISTS_ALBUMS_LOADING, updateCurrentArtistSaved,
    saveArtists, fetchArtistsAlbumsSuccessful, saveRelatedArtists
} from "../Actions/ArtistActions"

import {
    getTrackIds, getToken, getCurrentArtistId, findArtistById,
    findAlbumById, getCurrentAlbumId, getCurrentAlbumTracks
} from "../Reducers/Selectors"
import history from "../Components/history"
import {
    createArtistFromList, createTracksForAlbum,
    createAlbumFromData, createAlbumsForAnArtist, createSavedAlbums, createRecentPlayed, createTopTracksForArtist,
    createUsersTopTracks, createTop2Artists
} from "../Components/Utils/Utils"

//worker
export function* fetchHomePage() {
    while (select(getToken) === undefined) {
        yield select(getToken)
    }
    const token = yield select(getToken)
    try {
        const [data1, data2, data3] = yield all([
            call(fetchRecentPlayed, token),
            call(fetchUsersTopTracks, token),
            call(fetchUsersTopTwoArtists, token),
        ])
        const recentPlayed = createRecentPlayed(data1)
        const topTracks = createUsersTopTracks(data2)
        const topTwoArtists = createTop2Artists(data3)
        const albumsToSave = topTracks.albums.concat(recentPlayed.albums)
        const artistsToSave = (topTracks.artists.concat(recentPlayed.artists)).concat(topTwoArtists)
        yield all([
            put(saveToRecentlyPlay(recentPlayed.albumIds)),
            put(saveToUserTopTracks(topTracks.albumIds)),
            put(saveAlbums(albumsToSave)),
            put(saveArtists(artistsToSave))
        ])
        history.push("/Home")
    }
    catch (err) {
        console.log(err)
        //yield take(FETCH_FAILED)
    }
}

export function* checkArtistSaved(token) {
    const currentArtistId = yield select(getCurrentArtistId)
    const artistSaved = yield checkFollowArtist(token, currentArtistId)
    yield put(updateCurrentArtistSaved(artistSaved))
}


export function* fetchAlbumPage() {
    const token = yield select(getToken)
    while (select(getCurrentAlbumId) === undefined || "") {
        yield select(getCurrentAlbumId)
    }
    const currentAlbumId = yield select(getCurrentAlbumId)
    let albumsFromStore = yield select(findAlbumById(currentAlbumId))
    try {
        if (albumsFromStore === undefined) {
            const [data1, data2] = yield all([
                fetchAlbumById(token, currentAlbumId),
                fetchTracksForAlbum(token, currentAlbumId)
            ])
            const album = createAlbumFromData(data1)
            const tracks = createTracksForAlbum(data2)
            yield all([
                put(saveAlbums([album])),
                put(fetchAlbumTracksSuccessful(tracks))
            ])
        }
        else {
            const tracks = yield select(getCurrentAlbumTracks)
            if (tracks === undefined || tracks.length === 0) {
                const data3 = yield fetchTracksForAlbum(token, currentAlbumId)
                const otherTracks = createTracksForAlbum(data3)
                yield put(fetchAlbumTracksSuccessful(otherTracks))
            } else {
                //Tracks are already in the store. Change the display tracks. 
                const tracks = yield select(getCurrentAlbumTracks)
                yield put(updateDisplayTracks(tracks))
            }
        }
        yield call(checkAlbumPageSaved)
    } catch (err) {
        console.log(err)
    } finally {
        // yield history.push("/Album")
    }
}

export function* checkAlbumPageSaved() {
    //TODO check the album and all its tracks saved or not
    let [token, trackIds, albumId] = yield all([
        select(getToken),
        select(getTrackIds),
        select(getCurrentAlbumId)
    ])
    while (trackIds.length === 0 || albumId === "") {
        [trackIds, albumId] = yield all([
            select(getTrackIds),
            select(getCurrentAlbumId)
        ])
    }
    const [albumSaved, tracksSaved] = yield all([
        checkFollowAlbum(token, albumId),
        checkFollowTracks(token, trackIds)
    ])
    yield all([
        put(toggleAlbum(albumSaved)),
        put(toggleTrack(tracksSaved))
    ])
}

export function* fetchArtistPage() {
    const token = yield select(getToken)
    while (select(getCurrentArtistId) === undefined || "") {
        yield select(getCurrentArtistId)
    }
    const currentArtistId = yield select(getCurrentArtistId)
    let artistsFromStore = yield select(findArtistById(currentArtistId))
    try {
        if (artistsFromStore !== undefined) {
            console.log("artistsFromStore", artistsFromStore)
            const [albums, relatedArtists] = yield all([
                call(fetchArtistsAlbums, token),
                call(fetchRelatedArtists, token)
            ])
            const albums2 = createAlbumsForAnArtist(albums)
            const relatedArtists2 = createArtistFromList(relatedArtists)
            yield all([
                put(saveAlbums(albums2.albums)),
                put(saveAlbums(albums2.singles)),
                put(fetchArtistsAlbumsSuccessful(albums2)),
                put(saveRelatedArtists(relatedArtists2)),
                call(checkArtistSaved, token)
            ])
        }
        if (artistsFromStore === undefined) {
            const [artist, albums, relatedArtists] = yield all([
                call(fetchArtistById, token),
                call(fetchArtistsAlbums, token),
                call(fetchRelatedArtists, token)
            ])
            const artist1 = createArtistFromList(artist)
            const albums1 = createAlbumsForAnArtist(albums)
            const relatedArtists1 = createArtistFromList(relatedArtists)
            yield all([
                //save current artist
                // Optional: save the related artists into the artist part as well???
                put(saveAlbums(albums1.albums)),
                put(saveAlbums(albums1.singles)),
                put(saveArtists([artist1])),
                put(fetchArtistsAlbumsSuccessful(albums1)),
                put(saveRelatedArtists(relatedArtists1)),
                call(checkArtistSaved, token)
            ])
        }

    } catch (err) {
        console.log(err)
        //yield take(FETCH_FAILED)
    } finally {
        // yield history.push("/Artist")
    }
}

export function* fetchLibraryPage() {
    const token = yield select(getToken)
    //load the user's library
    try {
        const [data1, data2] = yield all([
            call(fetchSavedAlbums, token),
            call(fetchSavedArtists, token),
        ])
        const albumsAndArtists = createSavedAlbums(data1)
        const artists = createArtistFromList(data2)
        const artistsToSave = albumsAndArtists.artists.concat(artists)
        yield all([
            put(saveArtists(artistsToSave)),
            put(saveToSavedArtists(artists)),
            put(saveToSavedAlbums(albumsAndArtists.albums)),
        ])
    } catch (err) {
        console.log(err)
        //yield take(FETCH_FAILED)
    }
}

export function* watchInitHomePage() {
    yield take(SAVE_ACCESS_TOKEN);
    yield call(fetchHomePage)
}

export function* watchInitAlbumPage() {
    yield takeLatest(FETCH_ALBUM_TRACKS_LOADING, fetchAlbumPage)
}

export function* watchInitArtistPage() {
    yield takeLatest(FETCH_ARTISTS_ALBUMS_LOADING, fetchArtistPage)
}

export function* watchInitLibraryPage() {
    yield takeLatest(LOAD_LIBRARY_PAGE, fetchLibraryPage)
}

export const ApiSaga = [
    fork(watchInitHomePage),
    fork(watchInitAlbumPage),
    fork(watchInitArtistPage),
    fork(watchInitLibraryPage),
]