import React from 'react';
import createAlbum from "../album/Album"
import createArtist from "../artist/Artist"
import createTrack from "../track/Track"

export function createRequest(token, url, method) {
    if (token === undefined || url === undefined || method === undefined) {
        return
    }
    var myHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
    });

    var myInit = {
        method: method,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    var myRequest = new Request(url, myInit);

    return myRequest
}

export function convertToMin(duration_ms) {
    var duration = parseInt(duration_ms)
    var seconds = Math.floor((duration / 1000) % 60)
    var minutes = Math.floor((duration / (1000 * 60)) % 60)
    if (seconds < 10) {
        seconds = 0 + seconds.toString()
    }
    return (minutes + ":" + seconds)
}

export const findAlbumsById = (albums, albumId) => {
    const result = albums.find(item => item.get("albumId") === albumId)
    return result
}


export const findArtistsById = (artists, artistId) => {
    const result = artists.find(item => item.get("artistId") === artistId)
    return result
}

export function removeDuplicates(list) {
    let result = []
    let trimmedIdList = Array.from(new Set(list.map(each => each.get("artistId"))))
    result = trimmedIdList.map(each => {
        let midResult = findItemFromAList(each, list, "artistId")
        return midResult
    })
    return result
}


export function removeDuplicateAlbums(list) {
    let result = []
    let trimmedIdList = Array.from(new Set(list.map(each => each.get("albumId"))))
    let midResult = trimmedIdList.map(each => {
        return findItemFromAList(each, list, "albumId")
    })
    let trimmedNameList = Array.from(new Set(midResult.map(each => each.get("albumName"))))
    result = trimmedNameList.map(each => {
        return findItemFromAList(each, list, "albumName")
    })
    return result
}

function findItemFromAList(id, list, query) {
    let result
    list.map(each => {
        if (id === each.get(query)) {
            result = each
        }
    })
    return result
}

export const formatArtistNameForHeader = (list) => {
    if (list.length === 3) {
        return ("With " + list[0] + " ," + list[1] + " and " + list[2])
    }
    if (list.length === 2) {
        return ("With " + list[0] + " and " + list[1])
    }
    if (list.length === 1) {
        return ("With " + list[0])
    }
    if (list.length > 3) {
        return ("With " + list[0] + " ," + list[1] + " ," + list[2] + " and more...")
    }
    else {
        return ""
    }
}

export const toUrlString = (txtList) => {
    let result = ""
    if (txtList.length > 0) {
        result = txtList.join("%20")
    }
    return result
}

//Take in the url that is returned from Spotify and then get the access token
export const retrieveAccessToken = url => {
    let result = ""
    if (url !== undefined || "") {
        result = url.split("#")
    }
    if (result[1] !== undefined) {
        result = result[1].split("&")
    }
    if (result[0] !== undefined) {
        result = result[0].split("=")
    }
    result = result[1]
    console.log("result", result)
    return result

}

export function createArtistFromList(data) {
    let artists = []
    if (data === undefined) { return [] }
    console.log("list in util", data)
    if (data.length > 0) {
        data.map(each => {
            let url = each.images.length === 0 ? "" : each.images[0].url
            artists.push(createArtist(each.id, each.name, url))
        })
    }
    return artists
}



export function createTracksFromList(list) {
    let tracks = []
    if (list.length === 0 || list === undefined) { return [] }
    list.map(
        each => {
            let artists = each.track.artists.map(eachArtist => createArtist(eachArtist.id, eachArtist.name, ""))
            tracks.push(createTrack(each.track.id, each.track.name, convertToMin(each.track.duration_ms), each.track.preview_url, artists))
        })
    return tracks
}

export function createTracksForAlbum(list) {
    const tracks = list.map(each => {
        let artists = []
        each.artists.map(eachArtist => artists.push(
            createArtist(eachArtist.id, eachArtist.name, "")
        ))
        return createTrack(each.id, each.name, convertToMin(each.duration_ms), each.preview_url, artists)
    })
    return tracks
}

export function createAlbumFromData(data) {
    const albumImg = data.images[1] ? data.images[1].url : data.images[0] ? data.images[0].url : ""
    let anAlbum = createAlbum(data.id, data.name, albumImg, data.album_type,
        data.artists.map(eachArtist => eachArtist.id),
        data.artists.map(eachArtist => eachArtist.name))
    return anAlbum
}

export function createAlbumsForAnArtist(list) {
    let albumIds = []
    let albums = []   //instantialize the list to store albums
    let singles = []
    list.map(each => {
        if (!albumIds.includes(each.id)) {
            albumIds.push(each.id)
            let artistIds = []
            each.artists.map(eachArtist => {
                artistIds.push(eachArtist.id)
            })
            const albumImg = each.images[1] ? each.images[1].url : each.images[0] ? each.images[0].url : ""
            let anAlbum = createAlbum(each.id, each.name, albumImg, each.album_type,
                artistIds, each.artists.map(
                    eachArtist => eachArtist.name))
            albums.push(anAlbum)
            if (each.album_group === "album") {
                albums.push(anAlbum)
            }
            if (each.album_group === "single") {
                singles.push(anAlbum)
            }
        }
    })
    const result = {
        albums: albums,
        singles: singles
    }
    return result
}

export function createSavedAlbums(list) {
    let albumIds = []
    let albums = []
    let artists = []
    let artistIds = []
    if (list === undefined) {
        return
    }
    list.map(each => {
        each.album.artists.map(
            eachArtist => {
                artists.push(
                    createArtist(eachArtist.id, eachArtist.name, "")
                )
                artistIds.push(eachArtist.id)
            }
        )
        albumIds.push(each.album.id)
        const albumImg = each.album.images[1] ? each.album.images[1].url : each.album.images[0] ? each.album.images[0].url : ""
        let anAlbum = createAlbum(each.album.id, each.album.name, albumImg, each.album.album_type,
            each.album.artists.map(eachArtist => eachArtist.id), each.album.artists.map(
                eachArtist => eachArtist.name))
        albums.push(anAlbum)
    })
    return {
        albums: albums,
        artists: artists
    }
}

export function createTopTracksForArtist(list) {
    let tracks = []
    list.map(each => {
        const artists = each.artists.map(eachArtist => { return createArtist(eachArtist.id, eachArtist.name, "") })
        tracks.push(createTrack(each.id, each.name, convertToMin(each.duration_ms), each.preview_url, artists)
        )
    })
    return tracks.slice(0, 5)
}

export function createUsersTopTracks(list) {
    let albumIds = []
    let albums = []
    let artists = []
    if (list === undefined) {
        return
    }
    list.map(each => {
        let thisArtists = each.album.artists.map(
            eachArtist => createArtist(eachArtist.id, eachArtist.name, "")
        )
        artists = artists.concat(thisArtists)
        albumIds.push(each.album.id)
        let anAlbum = createAlbum(each.album.id, each.album.name, each.album.images[1].url,
            each.album.album_type, each.album.artists.map(eachArtist => eachArtist.id), each.album.artists.map(
                eachArtist => eachArtist.name))
        albums.push(anAlbum)
    })
    return {
        albumIds: albumIds,
        albums: albums,
        artists: artists
    }
}

export function createTop2Artists(list) {
    if (list === undefined) {
        return
    }
    let artists = []
    const firstArtist = createArtist(list[0].id, list[0].name, list[0].images[1].url)
    const secondArtist = createArtist(list[1].id, list[1].name, list[1].images[1].url)
    artists.push(firstArtist, secondArtist)
    return artists
}

export function createRecentPlayed(list) {
    let albums = []
    let albumIds = []
    let artists = []
    if (list === undefined) {
        return
    }
    list.map(each => {
        let thisArtists = each.track.album.artists.map(
            eachArtist => createArtist(eachArtist.id, eachArtist.name, ""))
        artists = artists.concat(thisArtists)
        albumIds.push(each.track.album.id)
        let anAlbum = createAlbum(each.track.album.id, each.track.album.name, each.track.album.images[1].url,
            each.track.album.album_type, each.track.album.artists.map(
                eachArtist => eachArtist.id), each.track.album.artists.map(
                    eachArtist => eachArtist.name))
        albums.push(anAlbum)
    })
    return {
        albumIds: albumIds,
        artists: artists,
        albums: albums
    }
}

export function createPlaylist(list) {
    let playlists = list.map(each => {
        return {
            id: each.id,
            name: each.name,
            img: each.images[0].url,
            owner: each.owner.display_name
        }
    })
    return playlists
}