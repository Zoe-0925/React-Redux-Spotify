export const SAVE_ALBUMS = "SAVE_ALBUMS"
export const FETCH_ARTISTS_ALBUMS_SUCCESSFUL = "FETCH_ARTISTS_ALBUMS_SUCCESSFUL"

export const saveAlbums = albums => ({
    type: SAVE_ALBUMS,
    albums: albums
})

export const fetchArtistsAlbumsSuccessful = data => ({
    type: FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
    data: data
})