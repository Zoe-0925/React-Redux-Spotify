const { Map } = require('immutable');

export default function createArtist(id, name, img) {
    return Map({
        "artistId": id,
        "artistName": name,
        "artistImg": img,
        "relatedArtists": [],
        "albums": [],
        "saved": "",
    })
}