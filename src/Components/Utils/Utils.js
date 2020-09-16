import createAlbum from "../Album/Album"
import createArtist from "../Artist/Artist"
import createTrack from "../TrackCard/Track"

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
    return new Request(url, myInit)
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
    return albums.find(item => item.get("albumId") === albumId)
}

export const findArtistsById = (artists, artistId) => {
    return artists.find(item => item.get("artistId") === artistId)
}

export function removeDuplicates(list) {
    return Array.from(new Set(list.map(each => each.get("artistId"))))
        .map(each => list.find(item => each === item.get("artistId")))
}

export function removeDuplicateAlbums(list) {
    const midResult = Array.from(new Set(list.map(each => each.get("albumId"))))
        .map(each => list.find(item => each === item.get("albumId")))
    const result = Array.from(new Set(midResult.map(each => each.get("albumName"))))
        .map(each => list.find(item => each === item.get("albumName")))
    return result
}

export function createArtistFromList(data) {
    if (data === undefined) { return [] }
    if (data.length > 0) {
        return data.map(each => {
            let url = each.images.length === 0 ? "" : each.images[0].url
            return createArtist(each.id, each.name, url)
        })
    }
}

export function createTracksFromList(list) {
    if (list.length === 0 || list === undefined) { return [] }
    return list.map(each => {
        let artists = each.track.artists.map(eachArtist => createArtist(eachArtist.id, eachArtist.name, ""))
        return createTrack(each.track.id, each.track.name, convertToMin(each.track.duration_ms), each.track.preview_url, artists)
    })
}

export function createTracksForAlbum(list) {
    return list.map(each => {
        let artists = []
        each.artists.map(eachArtist => artists.push(
            createArtist(eachArtist.id, eachArtist.name, "")
        ))
        return createTrack(each.id, each.name, convertToMin(each.duration_ms), each.preview_url, artists)
    })
}

export function createAlbumFromData(data) {
    const albumImg = data.images[1] ? data.images[1].url : data.images[0] ? data.images[0].url : ""
    return createAlbum(data.id, data.name, albumImg, data.album_type,
        data.artists.map(eachArtist => eachArtist.id),
        data.artists.map(eachArtist => eachArtist.name))
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
    return {
        albums: albums,
        singles: singles
    }
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