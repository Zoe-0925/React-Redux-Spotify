const { Map } = require('immutable');

export default function createTrack(id, name, duration_ms, preview_url, artists) {
    return Map({
        id: id,
        name: name,
        duration: duration_ms,
        url: preview_url,
        artists: artists
    })
}