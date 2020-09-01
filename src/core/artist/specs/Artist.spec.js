import createArtist from "../Artist"

describe("createArtist", () => {
    it("creates an artist object", () => {
        const result = createArtist("id", "name", "img")
        expect(result.get("artistId")).toEqual("id")
        expect(result.get("artistName")).toEqual("name")
        expect(result.get("artistImg")).toEqual("img")
        expect(result.get("relatedArtists")).toEqual([])
        expect(result.get("albums")).toEqual([])
        expect(result.get("saved")).toEqual([])
    })
})
