import { createSelector } from 'reselect'

export const getAlbumReducer = state => {
    return state.AlbumReducer
}

export const getAlbums = state => {
    return state.AlbumReducer.get("albums")
}

export const getCurrentAlbumId = state => {
    return state.AlbumReducer.get("currentAlbumId")
}

export const getCurrentArtistsAlbums = (state) => {
    return state.AlbumReducer.get("currentArtistAlbums")
}

export const findAlbumById = (state, albumId) => {
    return state.AlbumReducer.get("albums").find(item => item.get("albumId") === albumId)
}

export const getCurrentAlbumTracks = state => {
    const albumId = state.AlbumReducer.get("currentAlbumId")
    const album = state.AlbumReducer.get("albums").find(item => item.get("albumId") === albumId)
    if (album !== undefined) {
        return album.get("tracks")
    }
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getTracksInAlbum = (id) => createSelector(
    getAlbums,
    albums => {
        const album = albums.find(item => item.get("albumId") === id)
        if (album === undefined) { return [] }
        return album.get("trackIds")
    }

)
