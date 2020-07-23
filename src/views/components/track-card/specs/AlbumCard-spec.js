import React from 'react';
import renderer from 'react-test-renderer';
import AlbumCard from "../AlbumCard"
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

const { Map } = require('immutable');
const mockStore = configureStore([]);

const imgSrc = "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a"
const subtitle = ["artist 1", "artist 2", "artist 3"]
const artistIds = ["1", "2", "3"]

describe('AlbumCard Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore(Map({
            "currentAlbumId": "action.albumId"
        })
        )
    })

    const component = renderer.create(
            <AlbumCard subtitle={subtitle} artistIds={artistIds} imgSrc={imgSrc} title="title" />
    );

    const wrapper = shallow((<AlbumCard subtitle={subtitle} artistIds={artistIds} imgSrc={imgSrc} title="title" />))

    const dispatch = jest.fn();
    const fetchTracks = jest.fn();
    const handleArtistClick = jest.fn();

    it('should render with given state from Redux store', () => {
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('should dispatch an action on button click', () => {
        wrapper.find('.fetchTracks').simulate('click');
        wrapper.find('.card-img').simulate('click');
        expect(dispatch).toBeCalled();
        expect(handleArtistClick).toBeCalled();
        expect(fetchTracks).toBeCalled();
    });
});