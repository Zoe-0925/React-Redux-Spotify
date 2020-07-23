import React from 'react';
import renderer from 'react-test-renderer';
import SearchBar from "../SearchBar"

const handleInputDebounce = jest.fn()
//TODO add mock function fetchTracks

it('renders correctly', () => {
    const component = renderer.create(<SearchBar />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});