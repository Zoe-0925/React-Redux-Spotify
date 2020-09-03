import { createSelector } from 'reselect'
import { RECENTLY_PLAYED, USERS_TOP_TRACKS, SAVED_ALBUMS, SAVED_ARTISTS } from "./Constants"

export const getPlayerReducer = (state) => {
    return state.PlayerReducer
}

export const getAlbumReducer = (state) => {
    return state.AlbumReducer
}

export const getTrackReducer = (state) => {
    return state.TrackReducer
}

export const getLibraryReducer = (state) => {
    return state.LibraryReducer
}

export const getArtistReducer = (state) => {
    return state.ArtistReducer
}

export function getToken(state) {
    return state.UserReducer.accessToken;
}

/****************** Reselectors *********************/

//------------- Track Reducer ------------//

export const getTracks = createSelector(
    getTrackReducer,
    reducer => reducer.get("track")
)

export const getCurrentTracks = createSelector(
    getTrackReducer,
    reducer => reducer.get("currentDisplayTracks")
)

export const getTrackIds = createSelector(
    getCurrentTracks,
    tracks => tracks.map(each => each.get("id"))
)

export const getTrackNameById = id => createSelector(
    getCurrentTracks,
    tracks => tracks.find(item => item.id === id).name
)



//------------- Player Reducer ------------//


export const getPlayingTrack = createSelector(
    getPlayerReducer,
    playerReducer => playerReducer.get("currentTrack")
)


export const getSongPlaying = createSelector(
    getPlayerReducer,
    playerReducer => playerReducer.get("songPlaying")
)

export const getSongPaused = createSelector(
    getPlayerReducer,
    playerReducer => playerReducer.get("songPaused")
)

export const getTimeElapsed = createSelector(
    getPlayerReducer,
    playerReducer => playerReducer.get("timeElapsed")
)

export const getSongs = createSelector(
    getPlayerReducer,
    playerReducer => playerReducer.get("songs")
)

export const getSongDetails = createSelector(
    getPlayerReducer,
    playerReducer => playerReducer.get("songDetails")
)

//------------- Library Reducer ------------//

export const getTrackIdAndIndex = createSelector(
    getLibraryReducer,
    reducer => reducer.get("trackToToggle") //return id
)

export const getTrackToToggle = createSelector(
    getLibraryReducer,
    reducer => reducer.get("trackToToggle") //return id
)

export const getArtistToToggle = createSelector(
    getLibraryReducer,
    reducer => reducer.get("artistoToggle") //return id
)

export const getAlbumToToggle = createSelector(
    getLibraryReducer,
    reducer => reducer.get("albumToToggle") //return id
)

export const getPlaylistToToggle = createSelector(
    getLibraryReducer,
    reducer => reducer.get("playlistToToggle") //return id
)

export const getRecentlyPlayed = createSelector(
    getLibraryReducer,
    reducer => reducer.get(RECENTLY_PLAYED) //return id
)

export const getUserTopTracks = createSelector(
    getLibraryReducer,
    reducer => reducer.get(USERS_TOP_TRACKS) //return id
)

export const getSavedAlbums = createSelector(
    getLibraryReducer,
    reducer => reducer.get("Albums") //return id
)

export const getSavedArtists = createSelector(
    getLibraryReducer,
    reducer => reducer.get(SAVED_ARTISTS) //return id
)

//------------- Artist Reducer ------------//

export const findArtistById = (artistId) => createSelector(
    getArtistReducer,
    reducer => reducer.get("artists").find(item => artistId === item.get("artistId"))
)

export const getCurrentArtistId = createSelector(
    getArtistReducer,
    reducer => reducer.get("currentArtistId")
)

export const getArtists = createSelector(
    getArtistReducer,
    reducer => reducer.get("artists")
)

export const getCurrentArtist = createSelector(
    getArtists,
    getCurrentArtistId,
    (artists, id) => artists.find(item => item.get("artistId") === id)
)

export const getArtistSaved = createSelector(
    getCurrentArtistId,
    id => findArtistById(id).get("saved")
)

export const getRelatedArtists = createSelector(
    getArtistReducer,
    reducer => reducer.get("relatedArtists")
)

export const getCurrentArtistSaved = createSelector(
    getCurrentArtist,
    artist => artist !== undefined && artist.get("saved") !== undefined ? artist.get("saved") : false
)


//------------- Album Reducer ------------//

export const getAlbums = createSelector(
    getAlbumReducer,
    reducer => reducer.get("albums")
)

export const getCurrentAlbumId = createSelector(
    getAlbumReducer,
    reducer => reducer.get("currentAlbumId")
)

export const getCurrentArtistsAlbums = createSelector(
    getAlbumReducer,
    reducer => reducer.get("currentArtistAlbums")
)

export const findAlbumById = albumId => createSelector(
    getAlbums,
    albums => albums.find(item => item.get("albumId") === albumId)
)

export const findAlbumList = albumIds => createSelector(
    getAlbums,
    albums => albums.filter(item => albumIds.includes(item.get("albumId")))
)

export const getCurrentAlbumTracks = createSelector(
    getCurrentAlbumId,
    getAlbums,
    (id, albums) => {
        const found = albums.find(item => item.get("albumId") === id)
        if (found) { return found.get("tracks") }
    }
)

export const getTracksInAlbum = (id) => createSelector(
    getAlbums,
    albums => {
        const album = albums.find(item => item.get("albumId") === id)
        if (album) { return album.get("trackIds") }
    }
)

export const getAlbumsFromStore = createSelector(
    getAlbums,
    getCurrentAlbumId,
    (albums, currentAlbumId) => {
        return albums.find(item => item.get("albumId") === currentAlbumId)
    }
)

