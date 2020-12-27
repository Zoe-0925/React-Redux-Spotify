import { saveAlbums, fetchArtistsAlbumsSuccessful, SAVE_ALBUMS, FETCH_ARTISTS_ALBUMS_SUCCESSFUL }
    from "../AlbumActions"

describe('saveAlbums ', () => {
    it('should create an action', () => {
        const albums = [{ albumId: "1", albumName: "name" }]
        let action = saveAlbums(albums);
        expect(action).toEqual({
            type: TOGGLE_PLAYLIST,
            albums: albums
        });
    })
})

describe('fetchArtistsAlbumsSuccessful ', () => {
    it('should create an action', () => {
        const data = { albumId: "1", albumName: "name" }
        let action = fetchArtistsAlbumsSuccessful(data);
        expect(action).toEqual({
            type: FETCH_ARTISTS_ALBUMS_SUCCESSFUL,
            data: data
        });
    })
})