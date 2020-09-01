import { api_base_url } from "../Constants"
import { createRequest } from "../utils/Utils"
import { store } from "../../index"

//Get the top 6 tracks from the recently played tracks
export async function fetchRecentPlayed(token) {
    if (token === undefined || token === "") {
        return
    }
    const url = api_base_url + "me/player/recently-played?type=track&limit=7"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}

export async function fetchUsersTopTracks(token) {
    if (token === undefined || token === "") {
        return
    }
    const url = api_base_url + "me/top/tracks?limit=6"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}

//TODO Do I still need it???
export async function fetchUsersTopTwoArtists(token) {
    if (token === undefined || token === "") {
        return
    }
    const url = api_base_url + "me/top/artists?limit=2"
    var myRequest = createRequest(token, url, "GET")
    //.then((response) => {
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}


export async function fetchArtistsTopTracks(token) {
    if (token === undefined || token === "") {
        return
    }
    const artistId = store.getState().ArtistReducer.get("currentArtistId")
    const url = api_base_url + "artists/" + artistId + "/top-tracks?country=AU"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.tracks;
}


export async function fetchTracksForAlbum(token, albumId) {
    const url = api_base_url + "albums/" + albumId + "/tracks"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}

export async function fetchArtistsAlbums(token) {
    const artistId = store.getState().ArtistReducer.get("currentArtistId")
    const url = api_base_url + "artists/" + artistId + "/albums"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}

export async function fetchAlbumById(token, albumId) {
    const url = api_base_url + "albums/" + albumId
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data;
}

export async function fetchArtistById(token) {
    const artistId = store.getState().ArtistReducer.get("currentArtistId")
    const url = api_base_url + "artists/" + artistId
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data;
}

export async function fetchSearchResults(token, query, callback) {
    const url = api_base_url + "search?q=" + query + "&type=track%2Cartist%2Cplaylist%2Calbum&limit=6"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data;
}

export async function fetchSavedAlbums(token) {
    const url = api_base_url + "me/albums"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
    //  createSavedAlbums
    // store.dispatch(saveAlbums(albums))
    // store.dispatch(saveToSavedAlbums(albums))
    // store.dispatch(saveArtists(artists))
}

export async function fetchRelatedArtists(token) {
    const artistId = store.getState().ArtistReducer.get("currentArtistId")
    const url = api_base_url + "artists/" + artistId + "/related-artists"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.artists
}

export async function fetchSavedArtists(token) {
    const url = api_base_url + "me/following?type=artist"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.artists.items;
}

export async function fetchSavedTracks(token) {
    const url = api_base_url + "me/tracks"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}

export async function fetchSavedTracksNextPage(token, pageNumber) {
    const url = api_base_url + "me/tracks?limit=10&offset=" + (pageNumber - 1) * 20
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    return data.items;
}

export async function fetchSavedPlaylists(token) {
    const url = api_base_url + "me/playlists"
    var myRequest = createRequest(token, url, "GET")
    const response = await fetch(myRequest)
    const data = await response.json()
    console.log("saved playlists", data)
    return data;
}

export async function saveRemoveAlbum(token, albumId, method) {
    const url = api_base_url + "me/albums?ids=" + albumId
    var myRequest = createRequest(token, url, method)
    var response = await fetch(myRequest)
    return response.status
}

export async function followUnfollowArtist(token, artistId, method) {
    const url = api_base_url + "me/following?type=artist&ids=" + artistId
    var myRequest = createRequest(token, url, method)
    var response = await fetch(myRequest)
    return response.status
}

export async function saveRemoveTrack(token, trackId, method) {
    const url = api_base_url + "me/tracks?ids=" + trackId
    var myRequest = createRequest(token, url, method)
    var response = await fetch(myRequest)
    return response.status
}

export async function followUnfollowPlaylist(token, playlistId, method) {
    const url = api_base_url + "playlists/" + playlistId + "/followers"
    var myRequest = createRequest(token, url, method)
    var response = await fetch(myRequest)
    return response.status
}

export async function checkFollowArtist(token, artistId) {
    const url = api_base_url + "me/following/contains?type=artist&ids=" + artistId
    var myRequest = createRequest(token, url, "GET")
    var response = await fetch(myRequest)
    var data = await response.json()
    return data  //[true] or [false]
}

export async function checkFollowAlbum(token, albumId) {
    const url = api_base_url + "me/albums/contains?ids=" + albumId
    var myRequest = createRequest(token, url, "GET")
    var response = await fetch(myRequest)
    var data = await response.json()
    console.log("data albums", data)
    return data  //[true] or [false]
}

export async function checkFollowTracks(token, trackIds) {
    const formattedIds = trackIds.join(",")
    const url = api_base_url + "me/tracks/contains?ids=" + formattedIds
    var myRequest = createRequest(token, url, "GET")
    var response = await fetch(myRequest)
    var data = await response.json()
    console.log("data tracks", data)
    return data
}