import createAlbum from "../Album"
const { Map } = require('immutable');

const mockAlbum = Map({
    albumId: "albumId",
    albumName: "albumName",
    albumImg: "albumImg",
    albumType: "album_type",
    artistIds: "artistIds",
    artistNames: "artistNames",
})
const album = createAlbum("albumId", "albumName", "albumImg", "album_type", "artistIds", "artistNames")

test('album is created correctly', () => {
    expect(album.toEqual(mockAlbum))
});