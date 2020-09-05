import React from 'react';
import renderer from 'react-test-renderer';
import ArtistPageHeader from "../ArtistPageHeader"

const imgSrc = "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a"
const artistName="Lady Gaga"


it('renders correctly', () => {
    const component = renderer.create(<ArtistPageHeader imgSrc={imgSrc} artistName={artistName}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});