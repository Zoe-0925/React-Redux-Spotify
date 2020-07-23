import {
    getTrackIds, getTracksSaved, getTracks
} from "../Selectors"
const { Map } = require('immutable');

const currentDisplayTrack1 = new Map({
    "id": "1"
})
const currentDisplayTrack2 = new Map({
    "id": "2"
})
const trackReducer = new Map({
    "currentAlbumId": "1",
    "currentDisplayTracks": [currentDisplayTrack1, currentDisplayTrack2],
    "currentAlbumSaved": ["album1", "album2"],
    "currentTracksSaved": ["track1", "track2"]
})
const state = {
    TrackReducer: trackReducer
}

describe('getTrackIds', () => {
    it('should return all the track ids', () => {
        let selector = getTrackIds(state)
        expect(selector).toEqual(["1", "2"]);
    })
})


describe('getTracksSaved', () => {
    it('should return the albums', () => {
        let selector = getTracks(state)
        expect(selector).toEqual(["track1", "track2"]);
    })
})