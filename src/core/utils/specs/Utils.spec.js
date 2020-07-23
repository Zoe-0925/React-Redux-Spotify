import {
    retrieveAccessToken, findItemFromAList, removeDuplicateAlbums, createRequest,
    convertToMin, findAlbumsById, findArtistsById, removeDuplicates, findItemFromAList, toUrlString,
    retrieveAccessToken
} from "../Utils"
const { Map } = require('immutable');

describe('retrieveAccessToken ', () => {
    it('retrieves the access token from the url correctly', () => {
        const url = "before#a=token&b"
        const result = retrieveAccessToken(url)
        const expectedResult = "token"
        expect(result).toBe(expectedResult)
    })
})

describe('findItemFromAList ', () => {
    const result
    it('returns the matching result', () => {
        const id1 = "1"
        const list1 = Map({ "query1": "1", "query2": "2", "query3": "3" })
        const query1 = "query1"
        result = findItemFromAList(id1, list1, query1)
        expect(result).toBe({ "query1": "1" })
    })

    it('returns undefined if there is no matching result', () => {
        const id2 = "1"
        const list2 = Map({ "query3": "3" })
        const query2 = "query2"
        result = findItemFromAList(id2, list2, query2)
        expect(result).toBe(undefined)
    })
})

describe('removeDuplicateAlbums ', () => {
    it('return a list after removing duplicate items', () => {

    })
    it('return the list without modification if there is no duplicate item', () => {

    })
})

describe('createRequest ', () => {
    it('return a http request with the given url, token and HTTP method', () => {
        const result1 = createRequest("token", "url", "GET")
        //TODO dunno how to test ...
        //I think it's 2 objects equaling to each other???
    })
    it('return null if any argument is undefined', () => {
        const result2 = createRequest()
        expect(result2).toEqual(undefined)
    })
})

describe('convertToMin ', () => {
    it('formats a time to minutes and seconds', () => {
        const result1 = convertToMin(200000)
        expect(result1).toEqual("3:20")
    })
    it('return null if the argument is not a digit', () => {
        const result2 = convertToMin("not a number")
        expect(result2).toEqual(null)
    })
})

describe('findAlbumsById ', () => {
    const album1 = Map({
        "albumId": "1"
    })
    const album2 = Map({
        "albumId": "2"
    })
    it('returns an album if its id matches', () => {
        const albumList1 = []
        albumList1.push(album1, album2)
        const result1 = findAlbumsById(albumList1, "1")
        expect(result1).toEqual(album1)
    })
    it('return null if no album is found', () => {
        const albumList2 = []
        albumList2.push(album1)
        const result2 = findAlbumsById(albumList1, "2")
        expect(result2).toEqual(undefined)
    })
})

describe('findArtistsById ', () => {
    const artist1 = Map({
        "artistId": "1"
    })
    const artist2 = Map({
        "artistId": "2"
    })
    it('returns an artist if its id matches', () => {
        const artistList1 = []
        artistList1.push(artist1, artist2)
        const result1 = findArtistsById(artistList1, "1")
        expect(result1).toEqual(artist1)
    })
    it('return null if no artist is found', () => {
        const artistList2 = []
        artistList2.push(artist1)
        const result2 = findAlbumsById(artistList1, "2")
        expect(result2).toEqual(undefined)
    })
})

describe('removeDuplicates ', () => {
    it('removes duplicate items from a list', () => {
        

    })
    //removeDuplicates
})