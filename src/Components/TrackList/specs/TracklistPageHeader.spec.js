import React from 'react';
import renderer from 'react-test-renderer';
import TracklistPageHeader from "../TracklistPageHeader"
import { shallow } from 'enzyme';

const imgSrc = "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a"
const artistName = "Lady Gaga"
const title = "mock title"
const albumName = "album Name"
const playAlbum = jest.fn();
const saveToLikes = jest.fn();

//TODO find play icon and simulate click,
//expect  playAlbum() to be called

//TODO find icon iconsHeart and simulate click,
//expect  saveToLikes() to be called

describe('TracklistPageHeader Component', () => {
    it('renders correctly', () => {
        const component = renderer.create(<TracklistPageHeader imgSrc={imgSrc} albumName={albumName}
            artistName={artistName} title={title} playAlbum={playAlbum} saveToLikes={saveToLikes} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should dispatch an action on button click', () => {
        const wrapper = shallow((<TracklistPageHeader imgSrc={imgSrc} albumName={albumName}
            artistName={artistName} title={title} playAlbum={playAlbum} saveToLikes={saveToLikes} />))
        wrapper.find('.iconsHeart').simulate('click');
        wrapper.find('.playIcon').simulate('click');
        expect(playAlbum).toBeCalled();
        expect(saveToLikes).toBeCalled();
    })
}
)