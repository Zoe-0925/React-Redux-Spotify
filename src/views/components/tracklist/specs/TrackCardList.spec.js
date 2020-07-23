import React from 'react';
import renderer from 'react-test-renderer';
import TrackCardList from "../TrackCardList"
const { Map } = require('immutable');

const album1 = new Map({
    albumId: 1,
    albumName: "name 1",
    albumImg: "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a",
    albumType: "album",
    artistIds: "1",
    artistNames: "artistNames"
})
const album2 = new Map({
    albumId: 2,
    albumName: "name 2",
    albumImg: "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a",
    albumType: "album",
    artistIds: "2",
    artistNames: "artistNames"
})
const album3 = new Map({
    albumId: 3,
    albumName: "name 3",
    albumImg: "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a",
    albumType: "single",
    artistIds: "2",
    artistNames: "artistNames"
})
const albums = [album1, album2, album3]
const albumIds = ["1", "2", "3"]

it('renders correctly', () => {
    const component = renderer.create(<TrackCardList albums={albums} albumIds={albumIds} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});