const { Map } = require('immutable');

export default function createAlbum(albumId, albumName, albumImg, album_type, artistIds, artistNames) {
    return Map({
        albumId: albumId,
        albumName: albumName,
        albumImg: albumImg,
        albumType: album_type,
        artistIds: artistIds,
        artistNames: artistNames,
        tracks: []
    })
}