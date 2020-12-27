export const SAVE_ARTISTS = "SAVE_ARTISTS"
export const FETCH_ARTISTS_ALBUMS_LOADING = "FETCH_ARTISTS_ALBUMS_LOADING"
export const FETCH_ARTISTS_ALBUMS_SUCCESSFUL = "FETCH_ARTISTS_ALBUMS_SUCCESSFUL"
export const SAVE_ARTIST_IMG = "SAVE_ARTIST_IMG"
export const SAVE_RELATED_ARTISTS = "SAVE_RELATED_ARTISTS"
export const UPDATE_CURRENT_ARTIST_SAVED = "UPDATE_CURRENT_ARTIST_SAVED"
export const FETCH_TOGGLE_ARTIST_SAVED = "FETCH_TOGGLE_ARTIST_SAVED"

export const saveArtists = artists => ({
    type: SAVE_ARTISTS,
    artists: artists
})


export const fetchArtistsAlbumsLoading = id => ({
    type: FETCH_ARTISTS_ALBUMS_LOADING,
    artistId:id
})

export const fetchArtistsAlbumsSuccessful = data => ({
    type: FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
    data: data
})


export const saveRelatedArtists = artists => ({
    type: SAVE_RELATED_ARTISTS,
    artists: artists
})

export const updateCurrentArtistSaved = artists => ({
    type: UPDATE_CURRENT_ARTIST_SAVED,
    data: artists
})

export const fetchToggleArtistSaved = () => ({
    type: FETCH_TOGGLE_ARTIST_SAVED
})