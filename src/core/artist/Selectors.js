export function findArtistById(state, artistId) {
    return state.ArtistReducer.get("artists").find(item => artistId === item.get("artistId"))
}

export function getCurrentArtistId(state) {
    return state.ArtistReducer.get("currentArtistId")
}

export function getArtistSaved(state) {
    const artistId = getCurrentArtistId(state)
    const artist = findArtistById(state, artistId)
    return artist.get("saved")
}

export function getRelatedArtists(state){
    return state.ArtistReducer.get("relatedArtists")
}
